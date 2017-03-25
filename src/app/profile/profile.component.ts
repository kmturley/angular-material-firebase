import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseAuthState, FirebaseObjectObservable } from 'angularfire2';

export class Profile {
  date: number;
  email: string;
  name: string;
  photo: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  item: FirebaseObjectObservable<any>;

  constructor(public af: AngularFire) { }

  ngOnInit() {
    this.af.auth.subscribe((state: FirebaseAuthState) => {
      if (state) {
        console.log('ProfileComponent.logged in', state);
        this.item = this.af.database.object('/profiles/' + state.google.uid);
        this.item.set({
          email: state.google.email,
          name: state.google.displayName,
          photo: state.google.photoURL
        });
      } else {
        console.log('ProfileComponent.not logged in', state);
      }
    });
  }

  update(item: Profile) {
    this.item.update(item);
  }
}
