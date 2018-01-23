import { Observable } from "rxjs/Observable";
import { AppUser } from "../app-user";

export abstract class IAuthService {
    user$: Observable<firebase.User>;
    abstract login(): void;
    abstract logout(): void;
    readonly appUser$: Observable<AppUser>;
}