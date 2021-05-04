import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  isFullyAuthenticated$ = this.authService.isFullyAuthenticated$;
  constructor(private authService: AuthService) { }

  ngOnInit() {  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}
