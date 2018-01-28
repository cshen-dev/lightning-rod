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

@Injectable()
export class CoursesService {

  constructor(private afs: AngularFirestore) { }

  public getDummy() {
    return 'stupid';
  }

  public getDummyFromFirebase() {
     return this.afs.collection('courses').valueChanges();
  }

}
