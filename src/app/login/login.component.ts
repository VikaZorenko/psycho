import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ApiService } from '~/app/api.service';
import { AppService } from '~/app/app.service';

@Component({
    selector: "ns-login",
    templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
    username: string;
    password: string;
    error: any;

    constructor(
        private routerExtensions: RouterExtensions,
        private apiService: ApiService,
        public appService: AppService,
    ) { }

    ngOnInit(): void {
        if (this.appService.loggedIn) {
            this.login();
        }
    }

    login() {
        this.apiService.login({
            username: this.username,
            password: this.password
        }).subscribe(() => {
            this.proceed();
        }, error => this.error = error);
    }

    proceed() {
        this.routerExtensions.navigate(['/tests']);
    }
}
