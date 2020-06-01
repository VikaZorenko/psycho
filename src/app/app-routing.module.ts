import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { LoginComponent } from '~/app/login/login.component';
import { RegisterComponent } from '~/app/register/register.component';
import { TestsComponent } from '~/app/tests/tests.component';
import { ResultsComponent } from '~/app/result/results.component';
import { ResultDetailComponent } from '~/app/result/result-detail.component';
import { AnswerComponent } from '~/app/answer/answer.component';

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "tests", component: TestsComponent },
    { path: "tests/:id", component: ResultsComponent },
    { path: "results/:id", component: ResultDetailComponent },
    { path: "answer/:id", component: AnswerComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
