import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as firebase from 'firebase/app';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';


import { Review, ReviewCreator, CourseVersion } from '../service/courses.service';
import { CoursesService } from '../service/courses.service';
import { AuthService } from '../auth/auth.service';

interface CourseViewModel {
  name: string;
  code: string;
  semester: string;
  institute: string;
  logo: string;
  instructor: string;
  avatar: string;
  assignment: Array<Vote>;
  exam: Array<Vote>;
  marking: Array<Vote>;
  programming: Array<Vote>;
  workload: Array<Vote>;
  versions: Array<CourseVersion>;
  id: string;
}

interface Vote {
  tag: string;
  upvote: number;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  courses: Array<CourseViewModel> = [];
  currentCourseReviewer: ReviewCreator;
  private subscriptions: Array<Subscription> = [];
  private versionPreference: Map<string, number> = new Map();

  constructor(
    private authService: AuthService,
    private _coursesService: CoursesService,
    public dialog: MatDialog,
  ) {
    this.authService.currentUserObservable.subscribe((user) => {
      this.currentCourseReviewer = { displayName: user.displayName, uid: user.uid };
    });
  }


  ngOnInit() {
    this.loadCourseInfo();
  }

  loadCourseInfo() {
    console.log('start load course info');
    const courseInfoSubscription = this._coursesService.getCoursesInfo().subscribe(courses => {
      console.log(courses);
      courses.forEach(course => { this.parseCourse(course); });
    });
    this.subscriptions.push(courseInfoSubscription);
  }

  chooseLastedVersion(versions) {
    let tmpVersion;
    versions.forEach(version => {
      if (!tmpVersion || new Date(tmpVersion['createdAt']).getTime() < new Date(version['createdAt']).getTime()) {
        tmpVersion = version;
      }
    });
    return tmpVersion;
  }

  checkVersionPriority(versions) {
    let tmpVersion: CourseVersion;
    const tmpMax = 0;
    versions.forEach(version => {
      if (this.versionPreference.has(version.instructor)) {
        if (this.versionPreference.get(version.instructor) > tmpMax) {
          tmpVersion = version;
        }
      }
    });
    return tmpVersion;
  }

  public tuneVersionPriority(instructor) {
    if (this.versionPreference.has(instructor)) {
      const oldVal = this.versionPreference.get(instructor);
      this.versionPreference.set(instructor, oldVal + 1);
    } else {
      this.versionPreference.set(instructor, 1);
    }
    this.subscriptions.forEach(item => {
      item.unsubscribe();
    });
    this.loadCourseInfo();
  }

  loadReviews(courseViewModel, reviews) {
    courseViewModel.workload = [];
    courseViewModel.assignment = [];
    courseViewModel.exam = [];
    courseViewModel.programming = [];
    courseViewModel.marking = [];


    const workloadMap = new Map();
    const assignmentMap = new Map();
    const examMap = new Map();
    const programmingMap = new Map();
    const markingMap = new Map();

    reviews.forEach(review => {
      switch (review.category) {
        case 'exam': {
          this.doStats(examMap, review);
          break;
        }
        case 'workload': {
          this.doStats(workloadMap, review);
          break;
        }
        case 'assignment': {
          this.doStats(assignmentMap, review);
          break;
        }
        case 'programming': {
          this.doStats(programmingMap, review);
          break;
        }
        case 'marking': {
          this.doStats(markingMap, review);
          break;
        }
      }
    });
    this.map2arr(workloadMap, courseViewModel.workload);
    this.map2arr(assignmentMap, courseViewModel.assignment);
    this.map2arr(examMap, courseViewModel.exam);
    this.map2arr(markingMap, courseViewModel.marking);
    this.map2arr(programmingMap, courseViewModel.programming);
  }



  parseCourse(courseInfo) {
    console.log('start load reviews');

    let selectedVersion = this.checkVersionPriority(courseInfo.versions);
    if (!selectedVersion) {
      selectedVersion = this.chooseLastedVersion(courseInfo.versions);
    }

    console.log('selectedVersion:', selectedVersion);

    const reviewSubscription = this._coursesService.getCourseReviews(courseInfo.id, selectedVersion.instructor).subscribe(reviews => {

      if (reviews.length === 0) {
        return;
      }
      const newCourseViewModel = {} as CourseViewModel;
      newCourseViewModel.code = courseInfo.code;
      newCourseViewModel.logo = courseInfo.logo;
      newCourseViewModel.versions = courseInfo.versions;
      newCourseViewModel.institute = courseInfo.institute;
      newCourseViewModel.id = courseInfo.id;
      newCourseViewModel.name = selectedVersion.name;
      newCourseViewModel.avatar = selectedVersion.avatar;
      newCourseViewModel.instructor = selectedVersion.instructor;

      this.loadReviews(newCourseViewModel, reviews);

      console.log(newCourseViewModel);
      this.courses.splice(0, this.courses.length);
      this.courses.push(newCourseViewModel);
    });
    this.subscriptions.push(reviewSubscription);
  }

  doStats(map, review) {
    const tmpTag = review.tag;
    if (map.has(tmpTag)) {
      map.set(tmpTag, map.get(tmpTag) + 1);
    } else {
      map.set(tmpTag, 1);
    }
  }

  map2arr(map, arr) {
    map.forEach((value, key) => {
      const vote = {} as Vote;
      vote.tag = key;
      vote.upvote = value;
      arr.push(vote);
    });
  }

  addSeed() {
    this._coursesService.createSeedData();
  }

  addReview(category, course, tag): void {
    const newReview = {} as Review;
    newReview.category = category;
    newReview.createdAt = new Date();
    newReview.createdBy = this.currentCourseReviewer;
    newReview.instructor = course.instructor;
    newReview.tag = tag;
    console.log(newReview);
    console.log(course.id);
    this._coursesService.addReviews(course.id, newReview);
  }

  popReviewDialog(category, course): void {
    console.log(course);
    const dialogRef = this.dialog.open(AddReviewDialogComponent, {
      width: 'auto',
      data: { category: category }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.addReview(category, course, result);
    });
  }
}

@Component({
  selector: 'app-add-review-dialog',
  templateUrl: 'add-review-dialog.html',
})
export class AddReviewDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AddReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.data.tag = null;
    this.dialogRef.close();
  }
}
