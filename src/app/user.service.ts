import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase';
import { AppUser } from './models/app-user';
import { Observable } from 'rxjs/Observable';
import { IUserService } from './models/abstractions/user-service';

@Injectable()
export class UserService implements IUserService {

  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  get(uid: string): Observable<any> {
    return this.db.object("/users/" + uid).valueChanges();
  }

  isAdmin(uid: string): Observable<boolean> {
    return this.get(uid).map(user => {
      return user.isAdmin;
    });
  }
}
