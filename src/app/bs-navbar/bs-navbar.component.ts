import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AppUser } from '../models/app-user';
import { IAuthService } from '../models/abstractions/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnDestroy {
  private appUserSubscription: Subscription;
  
  public appUser: AppUser;

  constructor(public auth: IAuthService,
  private router: Router) {
    this.appUserSubscription = this.auth.appUser$.subscribe(appUser => {
      this.appUser = appUser;
    });
  }

  logout(): void {
    this.auth.logout().then((a: any) => {
      this.router.navigate(['/login']);
    });
  }

  ngOnDestroy(): void {
    this.appUserSubscription.unsubscribe();
  }
}
