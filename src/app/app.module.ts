// libraries
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { firebaseConfig } from './config';
import { MaterialModule } from '@angular/material';
import 'hammerjs';
import { RouterModule, Routes } from '@angular/router';

// components
import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import { LocationsComponent } from './locations/locations.component';

const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect
};

const appRoutes: Routes = [
  { path: 'locations', component: LocationsComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [ AppComponent, AccountComponent, LocationsComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
