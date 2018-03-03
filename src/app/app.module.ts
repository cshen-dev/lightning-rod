import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from './../environments/environment';

import { MaterialModule } from './material';
import { AuthModule } from './auth';
import { NavigationModule } from './navigation';
import { AboutModule } from './about';
import { HomeModule } from './home';
import { ProfileModule } from './profile';

import { appRoutes } from './app.routes';

import { AppComponent } from './app.component';

import { CoursesService } from './service/courses.service';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    NavigationModule,
    AuthModule,
    HomeModule,
    ProfileModule,
    AboutModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [CoursesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
