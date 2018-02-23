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

  private coursesCollectionName = 'courses2';
  private courseReviewCollectionName = 'reviews';


  public getCoursesInfo(code): Observable<CourseInfo[]> {
    code = code.toUpperCase();
    return this.afs
      .collection<CourseInfo>(this.coursesCollectionName, ref => ref.where('code', '==', code))
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
      .collection(this.coursesCollectionName)
      .doc(courseId)
      .collection<Review>(this.courseReviewCollectionName, ref => ref.where('instructor', '==', version))
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
        .collection(this.coursesCollectionName)
        .add(eachCourse)
        .then(ref => {
          eachCourse.versions.forEach( eachVersion => {
            reviews.forEach( eachReview => {
              eachReview.instructor = eachVersion.instructor;
              eachReview.createdBy = creator.uid;
              ref.collection(courseReviewCollectionName).add(eachReview);
            });
          });
        });
    });
  }

  public addReviews(courseId, newReview) {
    console.log('in addreview service...');
    return this.afs
      .collection(this.coursesCollectionName)
      .doc(courseId)
      .collection(this.courseReviewCollectionName)
      .add(newReview);
  }

}
