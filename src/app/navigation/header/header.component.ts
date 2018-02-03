import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: Observable<firebase.User>;

  doLogout() {
    this.authService.logout();
    this.router.navigate(['home']);
  }

  constructor(
    private authService: AuthService,
    private router: Router) {
    this.user = authService.currentUserObservable;
  }

  ngOnInit() {
  }

}
