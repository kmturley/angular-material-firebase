// libraries
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { firebaseConfig } from './config';
import { MaterialModule } from '@angular/material';
import 'hammerjs';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

// components
import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import { HomeComponent } from './home/home.component';
import { LocationsComponent } from './locations/locations.component';
import { ProfileComponent } from './profile/profile.component';

const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Popup
};

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'locations', component: LocationsComponent },
  { path: 'profile', component: ProfileComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [ AppComponent, AccountComponent, LocationsComponent, HomeComponent, ProfileComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
