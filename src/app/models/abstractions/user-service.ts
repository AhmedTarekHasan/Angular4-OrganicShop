import { Observable } from "rxjs/Observable";

export abstract class IUserService {
    abstract save(user: firebase.User);
    abstract get(uid: string): Observable<any>
    abstract isAdmin(uid: string): Observable<boolean>
}