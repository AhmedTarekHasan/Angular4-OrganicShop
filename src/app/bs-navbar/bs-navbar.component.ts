import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs/Subscription';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnDestroy {
  private appUserSubscription: Subscription;
  
  public appUser: AppUser;

  constructor(public auth: AuthService) {
    this.appUserSubscription = this.auth.appUser$.subscribe(appUser => {
      this.appUser = appUser;
    });
  }

  logout(): void {
    this.auth.logout();
  }

  ngOnDestroy(): void {
    this.appUserSubscription.unsubscribe();
  }
}
