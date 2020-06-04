import { Injectable } from "@angular/core";
import { token } from '~/app/api.service';
import {
    hasKey,
    clear
} from "tns-core-modules/application-settings";
import {requestCameraPermissions, takePicture} from "nativescript-camera";
import {ImageSource, fromFile, fromAsset} from "tns-core-modules/image-source";
import { knownFolders, path } from "tns-core-modules/file-system";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";


@Injectable({
    providedIn: "root"
})
export class AppService {
    resultId: string;
    testId: string;
    image: BehaviorSubject<ImageSource> = new BehaviorSubject<ImageSource>(null);

    get loggedIn() {
        return hasKey(token);
    }

    logout() {
        clear();
    }

    makeAvatar(username: string): void {
        requestCameraPermissions().then(() => {
            takePicture().then(imageAsset => {
                let documents = knownFolders.documents();
                let p = path.join(documents.path, `${username}.png`);
                fromAsset(imageAsset).then(imageSource => {
                    this.image.next(imageSource);
                    imageSource.saveToFile(p, "png");
                });
            });
        });
    }

    loadAvatar(username: string): void {
        const documents = knownFolders.documents();
        const p = path.join(documents.path, `${username}.png`);

        this.image.next(fromFile(p));
    }
}
