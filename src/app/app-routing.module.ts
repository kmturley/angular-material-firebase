import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from "app/home/home.component";
import { LocationsComponent } from "app/locations/locations.component";
import { LocationComponent } from "app/location/location.component";
import { MembersComponent } from "app/members/members.component";
import { MemberComponent } from "app/member/member.component";

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'locations', component: LocationsComponent },
    { path: 'locations/:id', component: LocationComponent },
    { path: 'members', component: MembersComponent },
    { path: 'members/:id', component: MemberComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }
