import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IAuthService } from './models/abstractions/auth-service';
import { IUserService } from './models/abstractions/user-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private userService: IUserService,
    private auth: IAuthService,
    private router: Router) {
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
        router.navigate(['/']);
      }
    });
  }
}
