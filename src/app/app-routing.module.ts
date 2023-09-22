import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsalGuard } from '@azure/msal-angular';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SuccesspaginaComponent } from './successpagina/successpagina.component';
import { UserFormComponent } from './user-form/user-form.component';

const routes: Routes = [
  {
    path: 'userform',
    component: UserFormComponent,
    // canActivate: [MsalGuard],
  },
  { path: 'succespagina', component: SuccesspaginaComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
