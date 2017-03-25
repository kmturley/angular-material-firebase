import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseAuthState, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  constructor(public af: AngularFire) {
    this.af.auth.subscribe((state: FirebaseAuthState) => {
      if (state) {
        console.log('logged in', state);
        // this.items.update(state.google.uid, state.google);
      } else {
        console.log('not logged in', state);
      }
    });
  }

  login() {
    this.af.auth.login();
  }

  logout() {
    this.af.auth.logout();
  }

}
