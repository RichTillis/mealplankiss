import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  isFullyAuthenticated$ = this.authService.isFullyAuthenticated$;
  constructor(private authService: AuthService) { }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}
