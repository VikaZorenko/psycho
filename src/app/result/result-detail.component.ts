import { Component, OnInit } from "@angular/core";
import {LoginResponce, TestResult} from '~/app/app.types';
import { RouterExtensions } from 'nativescript-angular/router';
import { ApiService } from '~/app/api.service';
import { AppService } from '~/app/app.service';


@Component({
    selector: "ns-result-detail",
    templateUrl: "./result-detail.component.html"
})
export class ResultDetailComponent implements OnInit {
    result: TestResult = null;
    user: LoginResponce = null;

    constructor(
        private routerExtensions: RouterExtensions,
        private apiService: ApiService,
        public appService: AppService,
    ) { }

    ngOnInit(): void {
        this.user = this.apiService.restoreData('user');
        this.apiService.testResult(
            this.appService.testId,
            this.appService.resultId
        ).subscribe(result => this.result = result);
    }

    logout() {
        this.appService.logout();
        this.routerExtensions.navigate(['/login']);
    }
}
