import { Component, OnInit } from "@angular/core";
import {LoginResponce, MOCK_LISTED_RESULT, TestListedResult} from '~/app/app.types';
import { RouterExtensions } from 'nativescript-angular/router';
import { ApiService } from '~/app/api.service';
import { AppService } from '~/app/app.service';

@Component({
    selector: "ns-results",
    templateUrl: "./results.component.html"
})
export class ResultsComponent implements OnInit {
    results: Array<TestListedResult> = [];
    user: LoginResponce = null;

    constructor(
        private routerExtensions: RouterExtensions,
        private apiService: ApiService,
        public appService: AppService,
    ) { }

    ngOnInit(): void {
        this.user = this.apiService.restoreData('user');
        this.apiService.testResults(
            this.appService.testId
        ).subscribe(
            results => this.results = results
        );
    }

    goToResult(resultId) {
        this.appService.resultId = resultId;

        this.routerExtensions.navigate(['/results', resultId]);
    }

    logout() {
        this.appService.logout();
        this.routerExtensions.navigate(['/login']);
    }
}
