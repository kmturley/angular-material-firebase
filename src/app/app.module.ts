import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { firebaseConfig } from './config';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect
};

@NgModule({
  imports: [
    BrowserModule,
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
