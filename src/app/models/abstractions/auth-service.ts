import { Observable } from "rxjs/Observable";
import { AppUser } from "../app-user";

export interface IAuthService {
    user$: Observable<firebase.User>;
    login(): void;
    logout(): void;
    readonly appUser$: Observable<AppUser>;
}