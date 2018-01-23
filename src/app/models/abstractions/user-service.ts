import { Observable } from "rxjs/Observable";

export interface IUserService {
    save(user: firebase.User);
    get(uid: string): Observable<any>
    isAdmin(uid: string): Observable<boolean>
}