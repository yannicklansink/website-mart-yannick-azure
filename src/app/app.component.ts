import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div>Hello {{ value }}</div>
    <app-user-form-component></app-user-form-component>
  `,
})
export class AppComponent {
  value = 'World';
}
