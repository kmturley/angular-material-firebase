import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseAuthState, FirebaseObjectObservable } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
    item: FirebaseObjectObservable<any>;

    constructor(
        public af: AngularFire,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.af.auth.subscribe((state: FirebaseAuthState) => {
            if (state) {
                console.log('AccountComponent.loggedIn', state);
                this.item = this.af.database.object(`/members/${state.uid}`);
                this.item.subscribe(data => {
                    console.log('AccountComponent.item.subscribe', data);
                    this.item.update({
                        name: data.name || state.google.displayName,
                        photo: data.photo || state.google.photoURL
                    });
                    if (!data.name) {
                        this.router.navigate([`/members/${state.uid}`], { queryParams: { edit: true } });
                    }
                });
            } else {
                console.log('AccountComponent.notLoggedIn', state);
            }
        });
    }

    login(): void {
        this.af.auth.login();
    }

    logout(): void {
        this.af.auth.logout();
    }

}
