import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

import { environment } from '../../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    MatCardModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatChipsModule,
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
