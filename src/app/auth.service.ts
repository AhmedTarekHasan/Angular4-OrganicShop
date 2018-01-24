import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from './models/app-user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import * as firebase from 'firebase';
import { IAuthService } from './models/abstractions/auth-service';
import { IUserService } from './models/abstractions/user-service';

@Injectable()
export class AuthService extends IAuthService {
  public user$: Observable<firebase.User>;

  constructor(private userService: IUserService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute) {
    super();
    this.user$ = this.afAuth.authState;
  }

  login(): Promise<void> {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '';
    localStorage.setItem('returnUrl', returnUrl);
    
    return this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$.switchMap(user => {
      if(user) {
        return this.userService.get(user.uid);
      } else {
        return Observable.of(null);
      }
    });
  }
}
