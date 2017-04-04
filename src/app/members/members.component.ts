import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

export class Member {
    name: string;
    photo: string;
}

@Component({
    selector: 'app-members',
    templateUrl: './members.component.html',
    styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
    item?: Member;
    items: FirebaseListObservable<any[]>;

    constructor(
        public af: AngularFire
    ) { }

    ngOnInit(): void {
        this.items = this.af.database.list('/members');
    }
}
