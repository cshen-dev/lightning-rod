import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';

import { environment } from '../../environments/environment';
import { MaterialModule } from '../material.module';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    MaterialModule,
    RouterModule
  ],
  exports: [
    LoginComponent,
    SignupComponent
  ],
  providers: [
    AngularFireAuth,
    AuthService
  ],
  declarations: [LoginComponent, SignupComponent]
})
export class AuthModule { }
