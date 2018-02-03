import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService) { }

  displayName: string;
  email: string;

  ngOnInit() {
    this.authService.currentUserObservable.subscribe((user) => {

      this.displayName = user.displayName;
      this.email = user.email;
    });
  }

}
