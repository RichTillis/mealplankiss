/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

import { environment as env } from '../../../../environments/environment';
import { map, tap } from 'rxjs/operators';
import { User } from '@auth0/auth0-spa-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private firebaseAuthenticatedSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isFirebaseAuthenticated$: Observable<boolean> = this.firebaseAuthenticatedSubject$.asObservable();

  readonly isFullyAuthenticated$: Observable<boolean> =
    combineLatest([this.isFirebaseAuthenticated$, this.auth0Service.isAuthenticated$]).pipe(
      tap(([firebaseAuth, auth0Auth]) => {
        console.log('Auth0 auth: ', auth0Auth);
        console.log('Firebase auth: ', firebaseAuth);
        console.log('isFullyAuthenticated: ', auth0Auth && firebaseAuth);
        console.log('');
      }),
      map(([firebaseAuth, auth0Auth]) => (firebaseAuth && auth0Auth))
    );

  constructor(private auth0Service: Auth0Service, private ngFireAuth: AngularFireAuth, private http: HttpClient) {
    // What should I do if Firebase is authenticated but Auth0 isn't?
    // Similarly, what should I do if Auth0 is authenticated but Firebase isn't?
    // TODO - need a defined process flow, probably starts here
    this.ngFireAuth.authState.subscribe((fbAuthUser: User) => {
      if (fbAuthUser) {
        this.firebaseAuthenticatedSubject$.next(true);
      } else {
        this.firebaseAuthenticatedSubject$.next(false);
      }
    });

    combineLatest([this.auth0Service.isAuthenticated$, this.auth0Service.user$]).pipe(
      tap(([auth0, auth0User]) => {
        if (auth0 && auth0User) {
          this.logIntoFirebase(auth0User.sub);
        }
      }),
    ).subscribe();
  }

  login() {
    this.auth0Service.loginWithPopup();
  }

  logout() {
    this.logoutOfAuth0();
    this.logoutOfFirebase();
  }

  private logIntoFirebase(userId: string) {
    this.getFireBaseAuthToken(userId).subscribe((loginToken: string) => {
      this.ngFireAuth.signInWithCustomToken(loginToken);
    });
  }

  private getFireBaseAuthToken(userId: string): Observable<any> {
    const params = new HttpParams().append('user_id', userId);
    return this.http.get(env.aws.testAuthTokenUrl, { params });
  }

  private logoutOfAuth0() {
    console.log('logging out of Auth0');
    this.auth0Service.logout();
  }

  private logoutOfFirebase() {
    this.ngFireAuth.signOut().then(
      () => console.log('Successfully signed out of Firebase'),
      err => console.log('An error occurred signing out of firebase: ', err));
  }
}
