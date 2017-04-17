// libraries
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import 'hammerjs';

import { AppRoutingModule } from './app-routing.module';
import { firebaseConfig } from './config';

// components
import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import { HomeComponent } from './home/home.component';
import { LocationsComponent } from './locations/locations.component';
import { LocationComponent } from './location/location.component';
import { MembersComponent } from './members/members.component';
import { MemberComponent } from './member/member.component';
import { PaginationComponent } from './pagination/pagination.component';

const myFirebaseAuthConfig = {
    provider: AuthProviders.Google,
    method: AuthMethods.Popup
};
@NgModule({
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        MaterialModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
    ],
    declarations: [AppComponent, AccountComponent, LocationsComponent, LocationComponent, HomeComponent, MembersComponent, MemberComponent, PaginationComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
