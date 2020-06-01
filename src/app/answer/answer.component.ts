import { Component, OnInit } from "@angular/core";
import { AskedQuestion, MOCK_ASKED_QUESTION, MOCK_TEST, Test } from '~/app/app.types';
import { RouterExtensions } from 'nativescript-angular/router';
import { ApiService } from '~/app/api.service';
import { AppService } from '~/app/app.service';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/internal/operators';

@Component({
    selector: "ns-answer",
    templateUrl: "./answer.component.html"
})
export class AnswerComponent implements OnInit {
    question: AskedQuestion = null;

    constructor(
        private routerExtensions: RouterExtensions,
        private apiService: ApiService,
        private appService: AppService,
    ) { }

    ngOnInit(): void {
        this.nextQuestion();
    }

    answer(answerId: string) {
        console.log('ANSWERANSWERANSWERANSWERANSWERANSWERANSWERANSWER', answerId)
        this.apiService.answer(
            this.appService.testId,
            this.appService.resultId,
            this.question.id,
            answerId
        ).subscribe(() => this.nextQuestion());
    }

    nextQuestion() {
        console.log('QUESTIONQUESTIONQUESTIONQUESTIONQUESTIONQUESTIONQUESTION')
        this.apiService.nextQuestion(
            this.appService.testId,
            this.appService.resultId
        ).pipe(
            catchError(err => {
                console.log('ERRORERRORERRORERRORERROR', err)
                this.end();

                return of<AskedQuestion>(null);
            }),
            tap(question => this.question = question as any)
        ).subscribe(question => {
            if (!question || !question.answers || !question.answers.length) {
                this.end();
            }
            console.log('11111111111111111111111111111')
        });
    }

    end() {
        this.routerExtensions.navigate(['/results', this.appService.resultId]);
    }
}
