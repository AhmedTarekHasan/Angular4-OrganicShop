import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AppUser } from '../models/app-user';
import { IAuthService } from '../models/abstractions/auth-service';
import { Router } from '@angular/router';
import { IShoppingCartService } from '../models/abstractions/shopping-cart-service';
import { LiteEventHandler } from '../shared/lite-event';
import { AppComponent } from '../app.component';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnDestroy {
  private appUserSubscription: Subscription;
  private onItemsCountUpdatedEventHandler: LiteEventHandler<number>;
  private shoppingCartService: IShoppingCartService;

  public appUser: AppUser;
  public shoppingCartItemsCount: number = 0;
  public shoppingCartTotalPrice: number = 0;
  
  constructor(public auth: IAuthService,
  private router: Router) {
    this.shoppingCartService = AppComponent.globalShoppingCartService;

    this.appUserSubscription = this.auth.appUser$.subscribe(appUser => {
      this.appUser = appUser;
      this.shoppingCartItemsCount = this.shoppingCartService.totalCount;
      this.shoppingCartTotalPrice = this.shoppingCartService.totalPrice;
    });

    this.onItemsCountUpdatedEventHandler = this.shoppingCartService.itemsCountUpdated.on((count: number) => {
      this.shoppingCartItemsCount = count;
      this.shoppingCartTotalPrice = this.shoppingCartService.totalPrice;
    });
  }

  logout(): void {
    this.auth.logout().then((a: any) => {
      this.router.navigate(['/login']);
    });
  }

  ngOnDestroy(): void {
    if(this.appUserSubscription) this.appUserSubscription.unsubscribe();
    if(this.onItemsCountUpdatedEventHandler) this.onItemsCountUpdatedEventHandler.off();
  }
}
