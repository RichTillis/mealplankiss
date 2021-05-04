import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  isFullyAuthenticated$ = this.authService.isFullyAuthenticated$;
  constructor(private authService: AuthService) { }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

}
