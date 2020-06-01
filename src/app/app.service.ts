import { Injectable } from "@angular/core";
import { token } from '~/app/api.service';
import {
    getString,
    setString,
    hasKey,
    remove
} from "tns-core-modules/application-settings";

@Injectable({
    providedIn: "root"
})
export class AppService {
    resultId: string;
    testId: string;

    get loggedIn() {
        return hasKey(token);
    }

    logout() {
        remove(token);
    }
}
