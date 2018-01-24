import { Observable } from "rxjs/Observable";
import { AppUser } from "../app-user";

export abstract class IAuthService {
    user$: Observable<firebase.User>;
    abstract login(): Promise<void>;
    abstract logout(): Promise<void>;
    readonly appUser$: Observable<AppUser>;
}