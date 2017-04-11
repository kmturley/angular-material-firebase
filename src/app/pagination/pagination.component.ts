import { Component, Input, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
    @Input() items: FirebaseListObservable<any[]>;
    @Input() limit = 8;
    page = 1;
    pages = 1;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.queryParams.subscribe((params: Params) => {
            if (params['page']) {
                this.page = parseInt(params['page'], 10);
            }
        });
        this.items.subscribe((data) => {
            this.pages = Math.ceil(data.length / this.limit);
        });
    }
}
