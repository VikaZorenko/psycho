import { Component, OnInit } from "@angular/core";
import { MOCK_TEST, Test } from '~/app/app.types';
import { RouterExtensions } from 'nativescript-angular/router';
import { ApiService } from '~/app/api.service';
import { AppService } from '~/app/app.service';
import { switchMap } from 'rxjs/internal/operators';
import { of } from 'rxjs';

@Component({
    selector: "ns-tests",
    templateUrl: "./tests.component.html"
})
export class TestsComponent implements OnInit {
    tests: Test[] = null;

    constructor(
        private routerExtensions: RouterExtensions,
        private apiService: ApiService,
        private appService: AppService,
    ) { }

    ngOnInit(): void {
        this.apiService.testList()
            .subscribe(tests => this.tests = tests);
    }

    goToTest(testId: string) {
        this.apiService.testResults(testId)
            .pipe(
                switchMap(results => {
                    const unfinishedTest = results.find(result => !result.is_finished);

                    return unfinishedTest
                        ? of(unfinishedTest)
                        : this.apiService.start(testId);
                })
            )
            .subscribe(result => {
                this.appService.testId = testId;
                this.appService.resultId = result.id;
                this.routerExtensions.navigate(['/answer', testId])
            });
    }

    goToResults(testId: string) {
        this.appService.testId = testId;
        this.appService.resultId = null;

        this.routerExtensions.navigate(['/tests', testId]);
    }

    logout() {
        this.appService.logout();
        this.routerExtensions.navigate(['/login']);
    }
}
