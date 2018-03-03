import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AboutComponent } from './about/about.component';
import { ProfileComponent } from './profile/profile.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'about', component: AboutComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];
