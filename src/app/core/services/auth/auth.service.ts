/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { BehaviorSubject, from, Observable, throwError, combineLatest } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

import { environment as env } from '../../../../environments/environment';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { RedirectLoginOptions, User } from '@auth0/auth0-spa-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private firebaseAuthenticatedSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isFirebaseAuthenticated$: Observable<boolean> = this.firebaseAuthenticatedSubject$.asObservable();

  readonly isFullyAuthenticated$: Observable<boolean> =
    combineLatest([this.isFirebaseAuthenticated$, this.auth0Service.isAuthenticated$]).pipe(
      tap(([firebaseAuth, auth0Auth]) => {
        console.log('isFullyAuthenticated: ', auth0Auth && firebaseAuth);
        console.log('');
      }),
      map(([firebaseAuth, auth0Auth]) => (firebaseAuth && auth0Auth))
    );

  constructor(
    private auth0Service: Auth0Service,
    private ngFireAuth: AngularFireAuth,
    private http: HttpClient
  ) {
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
    this.auth0Service.user$.pipe(
      concatMap((auth0User: User) => this.getFireBaseAuthToken(auth0User.sub).pipe(
        concatMap((loginToken: string) => from(this.ngFireAuth.signInWithCustomToken(loginToken))),
        catchError(firebaseTokenError => throwError(firebaseTokenError))
      )),
      catchError(err => throwError(err))
    ).subscribe();
  }

  private getFireBaseAuthToken(userId: string): Observable<any> {
    const params = new HttpParams().append('user_id', userId);
    return this.http.get(env.aws.testAuthTokenUrl, { params });
  }

  login(redirectPath: string = 'welcome') {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const loginOptions: RedirectLoginOptions = { redirect_uri: `${window.location.origin}`, appState: { target: redirectPath } };
    this.auth0Service.loginWithRedirect(loginOptions);
  }

  logout() {
    this.logoutOfAuth0();
    this.logoutOfFirebase();
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
