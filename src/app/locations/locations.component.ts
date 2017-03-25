import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

export class Location {
  date: number;
  name: string;
}

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
  item: Location = { date: 0, name: '' };
  items: FirebaseListObservable<any[]>;

  constructor(public af: AngularFire) {
  }

  ngOnInit() {
    this.items = this.af.database.list('/locations');
  }

  add(item: Location) {
    item.date = new Date().getTime();
    this.items.push(item).then(() => {
      this.reset();
    });
  }

  update(key: string, item: Location) {
    this.items.update(key, item);
  }

  delete(key: string) {
    this.items.remove(key);
  }

  reset() {
    this.item = { date: 0, name: '' };
  }
}
