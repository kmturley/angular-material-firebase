import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseAuthState, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { ActivatedRoute, Params } from '@angular/router';

import { Location } from '../locations/locations.component';
import { Member } from '../members/members.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

@Component({
    selector: 'app-member',
    templateUrl: './member.component.html',
    styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
    limit = 4;
    edit: boolean;
    likes: FirebaseListObservable<any>;
    locations: Observable<any[]>;
    member: FirebaseObjectObservable<any>;
    page = 1;
    pageStart = 0;
    pageEnd = this.limit;

    constructor(
        public af: AngularFire,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.member = this.af.database.object(`/members/${params['id']}`);
            this.locations = this.af.database.list(`/locations`);
            this.likes = this.af.database.list(`/likes/${params['id']}`);
            this.likes.subscribe((likes) => {
                this.locations = this.af.database.list(`/locations`)
                    .map((locations:Array<any>) => {
                        return locations.filter((location) => {
                            return likes.find(x => x.$key === location.$key) ? true : false;
                        });
                    });
            });
        });
        this.route.queryParams.subscribe((params: Params) => {
            if (params['edit']) {
                this.editMode(params['edit']);
            }
            if (params['page']) {
                this.page = parseInt(params['page'], 10);
                this.pageStart = (this.page - 1) * this.limit;
                this.pageEnd = this.page * this.limit;
            }
        });
    }

    editMode(isEditable: boolean): void {
        this.edit = isEditable;
    }

    save(member: Member): void {
        this.member.set(member);
    }

    update(name: string, desc: string, interests: string): void {
        this.member.update({ name: name, desc: desc, interests: interests });
        this.editMode(false);
    }

    delete(): void {
        this.member.remove();
    }
}
