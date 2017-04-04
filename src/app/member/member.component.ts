import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseAuthState, FirebaseObjectObservable } from 'angularfire2';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-member',
    templateUrl: './member.component.html',
    styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
    edit: boolean;
    item: FirebaseObjectObservable<any>;

    constructor(
        public af: AngularFire,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.item = this.af.database.object(`/members/${params['id']}`);
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

    save(obj: object): void {
        this.item.set(obj);
    }

    update(name: string, desc: string): void {
        this.item.update({ name: name, desc: desc });
        this.editMode(false);
    }

    delete(): void {
        this.item.remove();
    }
}
