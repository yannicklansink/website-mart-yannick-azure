import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult, InteractionType } from '@azure/msal-browser';
import { AuthServiceService } from './services/auth-service.service';

@Component({
  selector: 'app-root',
  template: `
    <div>Hello {{ value }}</div>
    <a routerLink="/userform">Form</a>
    <div></div>
    <div *ngIf="!isAuthenticated">
      <!-- Show when not authenticated -->
      <button (click)="login()">Login with Azure AD</button>
    </div>
    <div *ngIf="isAuthenticated">
      <!-- Show when authenticated -->
      <button (click)="logout()">Logout</button>
    </div>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  value = 'World';
  isAuthenticated = false;
  accessToken: string;

  constructor(
    private msalService: MsalService,
    private authService: AuthServiceService
  ) {
    this.checkAuthentication();
  }

  checkAuthentication() {
    this.isAuthenticated =
      this.msalService.instance.getAllAccounts().length > 0;
  }

  login() {
    this.msalService.loginPopup().subscribe(
      (response: AuthenticationResult) => {
        this.checkAuthentication();
        console.log('login method: ', response.accessToken);
        this.authService.setAccessToken(response.accessToken);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  logout() {
    this.msalService.logout();
    this.checkAuthentication();
  }
}
