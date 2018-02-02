import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

interface Course {
  name: string;
  brief: string;
  code: string;
  semester: string;
  institute: string;
  tags: Array<any>;
  logo: string;
  instructor: string;
  avatar: string;
}


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

interface CourseDetail {
  assignment: Array<Vote>;
  exam: Array<Vote>;
  marking: Array<Vote>;
  programming: Array<Vote>;
  workload: Array<Vote>;
  semesters: Array<string>;
  id: string;
  name: string;
  instructor: string;
  avatar: string;
}


@Injectable()
export class CoursesService {

  constructor(private afs: AngularFirestore) { }


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

  public getCourseDetail(courseId, version): Observable<CourseDetail[]> {
    return this.afs
      .collection('courses')
      .doc(courseId)
      .collection<CourseDetail>('info', ref => ref.where('instructor', '==', version))
      .valueChanges();
  }

}
