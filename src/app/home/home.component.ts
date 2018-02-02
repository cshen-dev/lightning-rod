import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../service/courses.service';
import { Observable } from 'rxjs/Observable';

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
  verions: Array<any>;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  courses: Array<CourseViewModel> = [];

  constructor(private _coursesService: CoursesService) {
    _coursesService.getCoursesInfo().subscribe(courses => {
      // console.log(courses);
      courses.map(courseInfo => {

        // console.log(courseInfo);
        let tmpVersion;
        courseInfo.versions.forEach(version => {
          if (!tmpVersion || new Date(tmpVersion['createdAt']).getTime() < new Date(version['createdAt']).getTime()) {
            tmpVersion = version;
          }
        });
        // console.log(tmpVersion);
        _coursesService.getCourseDetail(courseInfo.id, tmpVersion['name']).subscribe(courseDetail => {
          // console.log(courseDetail);
          const newCourseViewModel = {} as CourseViewModel;
          newCourseViewModel.code = courseInfo.code;
          newCourseViewModel.logo = courseInfo.logo;
          newCourseViewModel.verions = courseInfo.versions;
          console.log(newCourseViewModel.verions);
          newCourseViewModel.institute = courseInfo.institute;
          newCourseViewModel.name = courseDetail[0].name;
          newCourseViewModel.avatar = courseDetail[0].avatar;
          newCourseViewModel.instructor = courseDetail[0].instructor;
          newCourseViewModel.workload = courseDetail[0].workload;
          newCourseViewModel.assignment = courseDetail[0].assignment;
          newCourseViewModel.exam = courseDetail[0].exam;
          newCourseViewModel.programming = courseDetail[0].programming;
          newCourseViewModel.marking = courseDetail[0].marking;
          this.courses.push(newCourseViewModel);
        });

      });
    });
  }


  ngOnInit() {

  }

}
