import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ItemsComponent } from "./item/items.component";
import { ItemDetailComponent } from "./item/item-detail.component";
import { LoginComponent } from '~/app/login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from '~/app/register/register.component';
import { TestsComponent } from '~/app/tests/tests.component';
import { ResultsComponent } from '~/app/result/results.component';
import { ResultDetailComponent } from '~/app/result/result-detail.component';
import { AnswerComponent } from '~/app/answer/answer.component';
import { ApiService } from '~/app/api.service';
import { AppService } from '~/app/app.service';
import { CommonModule } from '@angular/common';

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        CommonModule,
        NativeScriptModule,
        AppRoutingModule,
        FormsModule,
        NativeScriptHttpClientModule,
        NativeScriptFormsModule
    ],
    declarations: [
        AppComponent,
        ItemsComponent,
        ItemDetailComponent,
        LoginComponent,
        RegisterComponent,
        TestsComponent,
        ResultsComponent,
        ResultDetailComponent,
        AnswerComponent
    ],
    providers: [
        ApiService,
        AppService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
