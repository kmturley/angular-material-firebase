import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent {
  items: FirebaseListObservable<any[]>;

  constructor(public af: AngularFire) {
    this.items = af.database.list('/locations');
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
