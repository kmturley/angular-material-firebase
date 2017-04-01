import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseAuthState, FirebaseObjectObservable } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  item: FirebaseObjectObservable<any>;
  constructor(public af: AngularFire, private router: Router) { }

  ngOnInit() {
    this.af.auth.subscribe((state: FirebaseAuthState) => {
      if (state) {
        console.log('AccountComponent.loggedIn', state);
        this.item = this.af.database.object('/profiles/' + state.google.uid);
        this.item.subscribe(data => {
          console.log('AccountComponent.item.subscribe');
          this.item.update({
            email: data.email || state.google.email,
            name: data.name || state.google.displayName,
            photo: data.photo || state.google.photoURL
          });
          if (!data.email) {
            this.router.navigate(['/profile'], { queryParams: { edit: true } });
          }
        });
      } else {
        console.log('AccountComponent.notLoggedIn', state);
        this.router.navigate(['/']);
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
