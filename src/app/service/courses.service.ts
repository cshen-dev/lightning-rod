import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../auth/auth.service';

// interface Course {
//   name: string;
//   brief: string;
//   code: string;
//   semester: string;
//   institute: string;
//   tags: Array<any>;
//   logo: string;
//   instructor: string;
//   avatar: string;
// }


interface CourseInfo {
  code: string;
  institute: string;
  lastUpdatedAt: Date;
  logo: string;
  versions: Array<any>;
  id: string;
}

export interface Vote {
  tag: string;
  upvote: number;
}

interface ReviewCreator {
  displayName: string;
  uid: string;
}

interface Review {
  id: string;
  category: string;
  createdAt: Date;
  createdBy: ReviewCreator;
  instructor: string;
  tag: string;
}



@Injectable()
export class CoursesService {

  constructor(private afs: AngularFirestore,
    private authService: AuthService) { }


  public getCoursesInfo(): Observable<CourseInfo[]> {
    return this.afs
      .collection<CourseInfo>('courses')
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
      .collection('courses')
      .doc(courseId)
      .collection<Review>('reviews', ref => ref.where('instructor', '==', version))
      .valueChanges();
  }

  public createSeedData() {

    const creator = {} as ReviewCreator;

    this.authService.user.subscribe( user => {
      console.log(user.displayName);
      console.log(user.uid);
      creator.uid = user.uid;
      creator.displayName = user.displayName;
    });

    const newCourseInfo = {} as CourseInfo;
    newCourseInfo.code = 'COMP5347';
    newCourseInfo.institute = 'USYD';
    newCourseInfo.lastUpdatedAt = new Date();
    newCourseInfo.logo = `url('../../../assets/img/usyd.png')`;
    newCourseInfo.versions = [{
      createdAt: new Date('Mar 25 2018'),
      name: 'Web Application Development',
      avatar: '../../../assets/instructors/ying_zhou.png',
      semesters: ['2018S1', '2017S2'],
      instructor: 'Dr Zhou, Ying'
    }, {
      createdAt: new Date('Mar 25 2017'),
      name: 'Web Application Development',
      avatar: '../../../assets/instructors/ying_zhou.png',
      semesters: ['2017S1', '2016S2'],
      instructor: 'Dr Uwe'
    }];
    this.afs
      .collection('courses')
      .add(newCourseInfo)
      .then( ref => {
        const newReview = {} as Review;
        newReview.category = 'workload';
        newReview.tag = '还行';
        newReview.createdAt = new Date();
        newReview.createdBy = creator;
        newReview.instructor = 'Dr Zhou, Ying';
        ref.collection('reviews').add(newReview);


        const newReview2 = {} as Review;
        newReview.category = 'exam';
        newReview.tag = '考试比较难';
        newReview.createdAt = new Date();
        newReview.createdBy = creator;
        newReview.instructor = 'Dr Zhou, Ying';
        ref.collection('reviews').add(newReview);

        const newReview3 = {} as Review;
        newReview.category = 'assignment';
        newReview.tag = '比较实用';
        newReview.createdAt = new Date();
        newReview.createdBy = creator;
        newReview.instructor = 'Dr Zhou, Ying';
        ref.collection('reviews').add(newReview);

        const newReview4 = {} as Review;
        newReview.category = 'programming';
        newReview.tag = '需要编程';
        newReview.createdAt = new Date();
        newReview.createdBy = creator;
        newReview.instructor = 'Dr Zhou, Ying';
        ref.collection('reviews').add(newReview);

        const newReview5 = {} as Review;
        newReview.category = 'marking';
        newReview.tag = '分低';
        newReview.createdAt = new Date();
        newReview.createdBy = creator;
        newReview.instructor = 'Dr Zhou, Ying';
        ref.collection('reviews').add(newReview);
      });
  }

}
