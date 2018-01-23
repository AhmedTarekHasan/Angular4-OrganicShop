import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AppUser } from './models/app-user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { IAuthService } from './models/abstractions/auth-service';
import { IUserService } from './models/abstractions/user-service';

@Injectable()
export class AdminAuthGuardService implements CanActivate {

  constructor(private auth: IAuthService,
    private router: Router,
    private userService: IUserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.appUser$.map(user => {
      return user.isAdmin;
    });
  }
}
