import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { ActivatedRoute, Params } from '@angular/router';

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
    limit = 8;
    member?: Member;
    members: FirebaseListObservable<any[]>;
    page = 1;
    pageStart = 0;
    pageEnd = this.limit;

    constructor(
        public af: AngularFire,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.members = this.af.database.list('/members');
        this.route.queryParams.subscribe((params: Params) => {
            if (params['page']) {
                this.page = parseInt(params['page'], 10);
                this.pageStart = (this.page - 1) * this.limit;
                this.pageEnd = this.page * this.limit;
            }
        });
    }
}
