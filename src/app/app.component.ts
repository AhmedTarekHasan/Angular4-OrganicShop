import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IAuthService } from './models/abstractions/auth-service';
import { IUserService } from './models/abstractions/user-service';
import { IShoppingCartService } from './models/abstractions/shopping-cart-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  public static globalShoppingCartService: IShoppingCartService

  constructor(private userService: IUserService,
    private auth: IAuthService,
    private router: Router,
    private shoppingCartService: IShoppingCartService) {
    AppComponent.globalShoppingCartService = shoppingCartService;

    auth.user$.subscribe(user => {
      if(user) {
        userService.save(user);

        const returnUrl = localStorage.getItem('returnUrl');
        localStorage.setItem('returnUrl', '');

        if(returnUrl && returnUrl != '') {
          router.navigate([returnUrl]);
        } else if(router.routerState.snapshot.url == '/login'){
          router.navigate(['/']);
        }
      } else {
        router.navigate(['/login']);
      }
    });
  }
}
