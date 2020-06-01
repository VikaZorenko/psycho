import { Injectable } from "@angular/core";
import {
    AskedQuestion,
    LoginResponce,
    RegisterData,
    RegisterResponce,
    Test,
    TestListedResult,
    TestResult
} from '~/app/app.types';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/internal/operators';
import {
    getString,
    setString,
    hasKey
} from "tns-core-modules/application-settings";

const api = 'https://still-escarpment-95590.herokuapp.com/api/';
export const token = 'token';

@Injectable({
    providedIn: "root"
})
export class ApiService {

    constructor(
        private http: HttpClient
    ) {}

    get headers() {
        return hasKey(token)
            ? { Authorization: `Token ${getString(token)}` }
            : {};
    }

    register(data: RegisterData): Observable<RegisterResponce> {
        return this.http.post<RegisterResponce>(`${api}register`, data)
            .pipe(tap(res => console.log('register', res)));
    }

    login(data: Partial<RegisterData>): Observable<LoginResponce> {
        return this.http.post<LoginResponce>(`${api}token-auth`, data)
            .pipe(
                tap(res => {
                    console.log('login', res)
                    setString(token, res.token);
                })
            );
    }

    testList(): Observable<Test[]> {
        return this.http.get<Test[]>(`${api}tests`, { headers: this.headers })
            .pipe(tap(res => console.log('testList', res)));
    }

    start(testId: string): Observable<TestListedResult> {
        return this.http.post<TestListedResult>(`${api}tests/${testId}/start`, null, { headers: this.headers })
            .pipe(tap(res => console.log('start', res)));
    }

    nextQuestion(testId: string, resultId: string): Observable<AskedQuestion> {
        return this.http.get<AskedQuestion>(`${api}tests/${testId}/results/${resultId}/next-question`, { headers: this.headers })
            .pipe(tap(res => console.log('nextQuestion', res)));
    }

    answer(testId: string, resultId: string, question_id: string, answer_id: string) {
        return this.http.post(
            `${api}tests/${testId}/results/${resultId}/answer`,
            { question_id, answer_id},
            { headers: this.headers }
            )
            .pipe(tap(res => console.log('answer', res)));
    }

    testResults(testId: string): Observable<TestListedResult[]> {
        return this.http.post<TestListedResult[]>(`${api}tests/${testId}/results`, null, { headers: this.headers })
            .pipe(tap(res => console.log('testResults', res)));
    }

    testResult(testId: string, resultId: string): Observable<TestResult> {
        return this.http.post<TestResult>(`${api}tests/${testId}/results/${resultId}`, null, { headers: this.headers })
            .pipe(tap(res => console.log('testResult', res)));
    }
}
