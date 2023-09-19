import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserFormComponent } from './user-form/user-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, UserFormComponent],
  imports: [BrowserModule, ReactiveFormsModule, HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
