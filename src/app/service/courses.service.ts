import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import { AuthService } from '../auth/auth.service';
import { courses, reviews } from '../seed/data';

export interface CourseInfo {
  code: string;
  institute: string;
  lastUpdatedAt: Date;
  logo: string;
  versions: Array<CourseVersion>;
  id: string;
}

export interface CourseVersion {
  avatar: string;
  createdAt: Date;
  instructor: string;
  name: string;
  semesters: Array<string>;
}

export interface ReviewCreator {
  displayName: string;
  uid: string;
}

export interface Review {
  id: string;
  category: string;
  createdAt: Date;
  createdBy: ReviewCreator;
  instructor: string;
  tag: string;
}



@Injectable()
export class CoursesService {

  user: Observable<firebase.User>;

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService) {
    this.user = authService.currentUserObservable;
  }


  public getCoursesInfo(): Observable<CourseInfo[]> {
    return this.afs
      .collection<CourseInfo>('courses2')
      .snapshotChanges()
      .map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as CourseInfo;
          data.id = action.payload.doc.id;
          return data;
        });
      });
  }

  public getCourseReviews(courseId, version): Observable<Review[]> {
    return this.afs
      .collection('courses2')
      .doc(courseId)
      .collection<Review>('reviews', ref => ref.where('instructor', '==', version))
      .valueChanges();
  }


  public createSeedData() {
    console.log('start inject...');

    const creator = {} as ReviewCreator;

    this.authService.user.subscribe(user => {
      console.log(user.displayName);
      console.log(user.uid);
      creator.uid = user.uid;
      creator.displayName = user.displayName;
    });

    courses.forEach( eachCourse => {
      this.afs
        .collection('courses2')
        .add(eachCourse)
        .then(ref => {
          eachCourse.versions.forEach( eachVersion => {
            reviews.forEach( eachReview => {
              eachReview.instructor = eachVersion.instructor;
              eachReview.createdBy = creator;
              ref.collection('reviews').add(eachReview);
            });
          });
        });
    };
  }

  public addReviews(courseId, newReview) {
    return this.afs
      .collection('courses')
      .doc(courseId)
      .collection('reviews')
      .add(newReview);
  }

}
