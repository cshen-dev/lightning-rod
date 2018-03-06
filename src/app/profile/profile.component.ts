import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { CoursesService } from '../service/courses.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private coursesService: CoursesService
  ) { }

  displayName: string;
  email: string;
  isAdmin = false;

  ngOnInit() {
    const currentUser = this.authService.currentUserObservable;
    if (currentUser) {
      currentUser.subscribe((user) => {
        if (!user) {return; }
        this.displayName = user.displayName;
        this.email = user.email;
        if (this.email === 'mushrchun@gmail.com') {
          this.isAdmin = true;
        }
      });
    }
  }

  injectSeed() {
    this.coursesService.createSeedData();
  }

}
