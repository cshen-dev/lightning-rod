import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from './../environments/environment';

import { MaterialModule } from './material.module';

import { AuthModule } from './auth/auth.module';
import { NavigationModule } from './navigation/navigation.module';

import { appRoutes } from './app.routes';

import { AboutComponent } from './about/about.component';
import { ProfileComponent } from './profile/profile.component';
import { AppComponent } from './app.component';
import { DetailComponent } from './detail/detail.component';
import { HomeComponent, AddReviewDialogComponent, AlarmSnackComponent } from './home/home.component';

import { CoursesService } from './service/courses.service';



@NgModule({
  declarations: [
    AppComponent,
    DetailComponent,
    HomeComponent,
    AboutComponent,
    ProfileComponent,
    AddReviewDialogComponent,
    AlarmSnackComponent
  ],
  entryComponents: [AddReviewDialogComponent, AlarmSnackComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    NavigationModule,
    AngularFirestoreModule,
    MaterialModule,
    AuthModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [CoursesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
