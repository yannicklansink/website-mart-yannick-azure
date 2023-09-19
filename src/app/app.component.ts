import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-root',
  template: `
    <div>Hello {{ value }}</div>
    <a routerLink="/userform">Form</a>
    <div></div>
    <div *ngIf="!isAuthenticated">
      <!-- Show when not authenticated -->
      <button (click)="login()" [disabled]="isLoggingIn">
        Login with Azure AD
      </button>
    </div>
    <div *ngIf="isAuthenticated">
      <!-- Show when authenticated -->
      <button (click)="logout()">Logout</button>
    </div>
    <router-outlet></router-outlet>
    <!-- <app-user-form-component></app-user-form-component> -->
  `,
})
export class AppComponent {
  value = 'World';
  isAuthenticated = false;

  constructor(private msalService: MsalService) {
    this.checkAuthentication();
  }

  checkAuthentication() {
    this.isAuthenticated =
      this.msalService.instance.getAllAccounts().length > 0;
  }

  isLoggingIn = false;

  login() {
    this.isLoggingIn = true;
    this.msalService.loginPopup().subscribe(
      (response) => {
        this.checkAuthentication();
        this.isLoggingIn = false;
      },
      (error) => {
        console.error(error);
        this.isLoggingIn = false;
      }
    );
  }

  logout() {
    this.msalService.logout();
    this.checkAuthentication();
  }
}
