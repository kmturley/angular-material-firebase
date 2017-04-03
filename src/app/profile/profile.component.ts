import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseAuthState, FirebaseObjectObservable } from 'angularfire2';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  edit: Boolean;
  item: FirebaseObjectObservable<any>;
  constructor(public af: AngularFire, private route: ActivatedRoute) { }

  ngOnInit() {
    this.af.auth.subscribe((state: FirebaseAuthState) => {
      if (state) {
        console.log('ProfileComponent.loggedIn', state);
        this.route.params.subscribe((params: Params) => {
          this.item = this.af.database.object(`/users/${params['id']}`);
        });
        this.route.queryParams.subscribe((params: Params) => {
          if (params['edit']) {
            this.editMode(params['edit']);
          }
        });
      } else {
        console.log('ProfileComponent.notLoggedIn', state);
      }
    });
  }

  editMode(isEditable: Boolean) {
    this.edit = isEditable;
  }

  save(obj: Object) {
    this.item.set(obj);
  }

  update(name: string, email: string, intro: string) {
    console.log(this.item);
    this.item.update({ name: name, email: email, intro: intro });
    this.editMode(false);
  }

  delete() {
    this.item.remove();
  }
}
