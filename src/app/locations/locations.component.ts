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
    item?: Location;
    items: FirebaseListObservable<any[]>;

    constructor(
        public af: AngularFire
    ) { }

    ngOnInit(): void {
        this.items = this.af.database.list('/locations');
    }

    add(item: Location): void {
        item.date = new Date().getTime();
        this.items.push(item).then(() => {
            item = undefined;
        });
    }

    update(key: string, item: Location): void {
        item.date = new Date().getTime();
        this.items.update(key, item);
    }

    delete(key: string): void {
        this.items.remove(key);
    }
}
