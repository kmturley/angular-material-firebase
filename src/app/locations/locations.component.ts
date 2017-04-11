import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { ActivatedRoute, Params } from '@angular/router';

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
    limit = 8;
    location: Location;
    locations: FirebaseListObservable<any[]>;
    page = 1;
    pageStart = 0;
    pageEnd = this.limit;

    constructor(
        public af: AngularFire,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.location = { date: 0, name: '' };
        this.locations = this.af.database.list('/locations');
        this.route.queryParams.subscribe((params: Params) => {
            if (params['page']) {
                this.page = parseInt(params['page'], 10);
                this.pageStart = (this.page - 1) * this.limit;
                this.pageEnd = this.page * this.limit;
            }
        });
    }

    add(location: Location): void {
        location.date = new Date().getTime();
        this.locations.push(location).then(() => {
            this.location = { date: 0, name: '' };
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
