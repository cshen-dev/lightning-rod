import { Component, OnInit, Inject } from '@angular/core';
import { CoursesService } from '../service/courses.service';
import { Observable } from 'rxjs/Observable';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Vote } from '../service/courses.service';

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
}

interface CourseVersion {
  avatar: string;
  createdAt: Date;
  instructor: string;
  name: string;
  semester: Array<string>;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  courses: Array<CourseViewModel> = [];

  constructor(
    private _coursesService: CoursesService,
    public dialog: MatDialog) {
  }


  ngOnInit() {
    this.loadCourseInfo();
  }

  loadCourseInfo() {
    this._coursesService.getCoursesInfo().subscribe(courses => {
      console.log(courses);
      courses.map(courseInfo => {

        let tmpVersion;
        courseInfo.versions.forEach(version => {
          if (!tmpVersion || new Date(tmpVersion['createdAt']).getTime() < new Date(version['createdAt']).getTime()) {
            tmpVersion = version;
          }
        });
        console.log(courseInfo.versions);
        // console.log(tmpVersion);
        this._coursesService.getCourseReviews(courseInfo.id, tmpVersion.instructor).subscribe(reviews => {
          console.log(reviews);
          if (reviews.length === 0) {
            return;
          }
          const newCourseViewModel = {} as CourseViewModel;
          newCourseViewModel.code = courseInfo.code;
          newCourseViewModel.logo = courseInfo.logo;
          newCourseViewModel.versions = courseInfo.versions;
          newCourseViewModel.institute = courseInfo.institute;
          newCourseViewModel.name = tmpVersion.name;
          newCourseViewModel.avatar = tmpVersion.avatar;
          newCourseViewModel.instructor = tmpVersion.instructor;

          newCourseViewModel.workload = [];
          newCourseViewModel.assignment = [];
          newCourseViewModel.exam = [];
          newCourseViewModel.programming = [];
          newCourseViewModel.marking = [];

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
          this.map2arr(workloadMap, newCourseViewModel.workload);
          this.map2arr(assignmentMap, newCourseViewModel.assignment);
          this.map2arr(examMap, newCourseViewModel.exam);
          this.map2arr(markingMap, newCourseViewModel.marking);
          this.map2arr(programmingMap, newCourseViewModel.programming);
          console.log(newCourseViewModel);
          this.courses.push(newCourseViewModel);
        });

      });
    });
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
    map.forEach( (value, key) => {
      const vote = {} as Vote;
      vote.tag = key;
      vote.upvote = value;
      arr.push(vote);
    });
  }

  addSeed() {
    this._coursesService.createSeedData();
  }

  addReview(category): void {
    const dialogRef = this.dialog.open(AddReviewDialogComponent, {
      width: 'auto',
      data: { category: category }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.tag = result;
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
    this.dialogRef.close();
  }
}
