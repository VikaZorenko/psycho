import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from 'nativescript-angular/router';
import { ApiService } from '~/app/api.service';
import { AppService } from '~/app/app.service';

@Component({
    selector: "ns-register",
    templateUrl: "./register.component.html"
})
export class RegisterComponent implements OnInit {
    username: string;
    password: string;
    email: string;
    error: string;
    form: any;

    constructor(
        private routerExtensions: RouterExtensions,
        private apiService: ApiService,
        private appService: AppService,
    ) { }

    ngOnInit(): void {
    }

    register() {
        this.apiService.register({
            username: this.username,
            password: this.password,
            email: this.email
        }).subscribe((res) => {
            this.error = JSON.stringify(res);
        }, error => {
            this.error = error;
        });
    }

    proceed() {
        this.routerExtensions.navigate(['/login']);
    }
}
