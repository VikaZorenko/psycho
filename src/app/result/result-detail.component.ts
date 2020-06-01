import { Component, OnInit } from "@angular/core";
import { TestResult } from '~/app/app.types';
import { RouterExtensions } from 'nativescript-angular/router';
import { ApiService } from '~/app/api.service';
import { AppService } from '~/app/app.service';


@Component({
    selector: "ns-result-detail",
    templateUrl: "./result-detail.component.html"
})
export class ResultDetailComponent implements OnInit {
    result: TestResult = null;

    constructor(
        private routerExtensions: RouterExtensions,
        private apiService: ApiService,
        private appService: AppService,
    ) { }

    ngOnInit(): void {
        this.apiService.testResult(
            this.appService.testId,
            this.appService.resultId
        ).subscribe(result => this.result = result);
    }
}
