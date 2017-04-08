import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseAuthState, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { ActivatedRoute, Params } from '@angular/router';

import { Location } from '../locations/locations.component';
import { Member } from '../members/members.component';

@Component({
    selector: 'app-member',
    templateUrl: './member.component.html',
    styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
    edit: boolean;
    likes: FirebaseListObservable<any>;
    locations: FirebaseListObservable<any[]>;
    locationsLiked: Array<any[]>;
    member: FirebaseObjectObservable<any>;

    constructor(
        public af: AngularFire,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.member = this.af.database.object(`/members/${params['id']}`);
            this.likes = this.af.database.list(`/likes/${params['id']}`);
            this.likes.subscribe((likes) => {
                this.locations = this.af.database.list(`/locations`);
                this.locations.subscribe((locations) => {
                    this.locationsLiked = locations.filter((location) => {
                        return likes.find(x => x.$key === location.$key);
                    });
                });
            });
        });
        this.route.queryParams.subscribe((params: Params) => {
            if (params['edit']) {
                this.editMode(params['edit']);
            }
        });
    }

    editMode(isEditable: boolean): void {
        this.edit = isEditable;
    }

    save(member: Member): void {
        this.member.set(member);
    }

    update(name: string, desc: string): void {
        this.member.update({ name: name, desc: desc });
        this.editMode(false);
    }

    delete(): void {
        this.member.remove();
    }
}
