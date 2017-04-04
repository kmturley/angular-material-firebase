// libraries
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import 'hammerjs';

import { AppRoutingModule } from './app-routing.module';
import { firebaseConfig } from './config';

// components
import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import { HomeComponent } from './home/home.component';
import { LocationsComponent } from './locations/locations.component';
import { MembersComponent } from './members/members.component';
import { MemberComponent } from './member/member.component';

const myFirebaseAuthConfig = {
    provider: AuthProviders.Google,
    method: AuthMethods.Popup
};
@NgModule({
    imports: [
        BrowserModule,
        FlexLayoutModule,
        FormsModule,
        MaterialModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
    ],
    declarations: [AppComponent, AccountComponent, LocationsComponent, HomeComponent, MembersComponent, MemberComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
