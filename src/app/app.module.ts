import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { UserFormComponent } from './user-form/user-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MsalModule, MSAL_INSTANCE, MsalService } from '@azure/msal-angular';
import {
  IPublicClientApplication,
  PublicClientApplication,
} from '@azure/msal-browser';
import { AppRoutingModule } from './app-routing.module';
import { SuccesspaginaComponent } from './successpagina/successpagina.component';
import { LoggingService } from './services/logging.service';

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: 'fa0f1aa9-eea3-4802-9229-83e4c60c64ea',
      authority:
        'https://login.microsoftonline.com/7ed5147d-c6ee-4886-9e71-4a91ce3087ba',
      redirectUri: 'https://agreeable-meadow-0c593c303.3.azurestaticapps.net',
      // redirectUri: 'http://localhost:4200',
    },
  });
}

@NgModule({
  declarations: [AppComponent, UserFormComponent, SuccesspaginaComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    MsalModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    MsalService,
    LoggingService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
