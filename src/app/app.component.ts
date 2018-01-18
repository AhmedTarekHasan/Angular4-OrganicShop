import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private userService: UserService, private auth: AuthService, private router: Router) {
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
