import { Component } from '@angular/core';
import { AngularFire, FirebaseAuthState, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  items: FirebaseListObservable<any[]>;
  constructor(public af: AngularFire) {
    this.af.auth.subscribe((state: FirebaseAuthState) => {
      console.log('subscribe', state);
      if (state) {
        this.items = af.database.list('/users');
        this.items.update(state.google.uid, state.google);
      }
    });
  }
  login() {
    this.af.auth.login();
  }

  logout() {
     this.af.auth.logout();
  }

  addItem(newName: string) {
    this.items.push({ text: newName });
  }
  updateItem(key: string, newText: string) {
    this.items.update(key, { text: newText });
  }
  deleteItem(key: string) {
    this.items.remove(key);
  }
}
