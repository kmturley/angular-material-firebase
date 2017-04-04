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
    member?: Member;
    members: FirebaseListObservable<any[]>;

    constructor(
        public af: AngularFire
    ) { }

    ngOnInit(): void {
        this.members = this.af.database.list('/members');
    }
}
