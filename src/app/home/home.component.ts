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
  private versionPreference: Map<string, Date> = new Map();

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
    this.loadCoursesList();
  }

  loadCoursesList() {
    const courseInfoSubscription = this._coursesService.getCoursesInfo().subscribe(courses => {
      courses.forEach(course => { this.loadCourseReview(course); });
    });
    this.subscriptions.push(courseInfoSubscription);
  }
  /** This function is used for first loading when no version preference is set then */
  chooseLastedVersion(versions) {
    let tmpVersion;
    versions.forEach(version => {
      if (!tmpVersion || new Date(tmpVersion['createdAt']).getTime() < new Date(version['createdAt']).getTime()) {
        tmpVersion = version;
      }
    });
    return tmpVersion;
  }

  /** This function is applied after user choose specific version and version preference is set */
  chooseHighPriority(versions) {

    if (versions.length === 1) {
      return versions[0];
    }

    let tmpVersion: CourseVersion;
    let tmpMax;
    let firstFlag = true;
    const versionPreferenceMap = this.versionPreference;

    versions.forEach(version => {
      if (versionPreferenceMap.has(version.instructor)) {
        if (firstFlag) {
          tmpMax = versionPreferenceMap.get(version.instructor);
          tmpVersion = version;
          firstFlag = false;
          return;
        }

        if (versionPreferenceMap.get(version.instructor).getTime() > tmpMax.getTime()) {
          tmpMax = versionPreferenceMap.get(version.instructor);
          tmpVersion = version;
        }
      }
    });
    return tmpVersion;
  }

  public tuneVersionPriority(instructor) {
    this.versionPreference.set(instructor, new Date());

    this.subscriptions.forEach(item => {
      item.unsubscribe();
    });
    this.loadCoursesList();
  }

  parseReviews(courseViewModel, reviews) {
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

  buildSemesterStr(semesters) {
    let semesterStr = '';
    let firstFlag = true;
    semesters.forEach(semester => {
      if (firstFlag) {
        semesterStr += semester;
        firstFlag = false;
        return;
      }
      semesterStr += ', ' + semester;
    });
    return semesterStr;
  }

  loadCourseReview(courseInfo) {

    let selectedVersion = this.chooseHighPriority(courseInfo.versions);
    if (!selectedVersion) {
      selectedVersion = this.chooseLastedVersion(courseInfo.versions);
    }

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

      newCourseViewModel.semester = this.buildSemesterStr(selectedVersion.semesters);

      this.parseReviews(newCourseViewModel, reviews);

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
    this._coursesService.addReviews(course.id, newReview);
  }

  popReviewDialog(category, course): void {
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
