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
    location?: Location;
    locations: FirebaseListObservable<any[]>;

    constructor(
        public af: AngularFire
    ) { }

    ngOnInit(): void {
        this.locations = this.af.database.list('/locations');
    }

    add(location: Location): void {
        location.date = new Date().getTime();
        this.locations.push(location).then(() => {
            location = undefined;
        });
    }

    update(key: string, location: Location): void {
        location.date = new Date().getTime();
        this.locations.update(key, location);
    }

    delete(key: string): void {
        this.locations.remove(key);
    }
}
