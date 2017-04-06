import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseAuthState, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { ActivatedRoute, Params } from '@angular/router';

import { Location } from '../locations/locations.component';

@Component({
    selector: 'app-location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
    edit: boolean;
    location: FirebaseObjectObservable<any>;
    likes: FirebaseListObservable<any>;
    likesLocation: FirebaseObjectObservable<any>;

    constructor(
        public af: AngularFire,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            if (params['id']) {
                this.location = this.af.database.object(`/locations/${params['id']}`);
                this.af.auth.subscribe((state: FirebaseAuthState) => {
                    if (state) {
                        this.likes = this.af.database.list(`/likes/${state.uid}`);
                        this.likesLocation = this.af.database.object(`/likes/${state.uid}/${params['id']}`);
                    }
                });
            }
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

    save(): void {
        this.likesLocation.set(new Date().getTime());
    }

    update(name: string, desc: string): void {
        this.location.update({ name: name, desc: desc });
        this.editMode(false);
    }

    delete(): void {
        this.likesLocation.remove();
    }
}
