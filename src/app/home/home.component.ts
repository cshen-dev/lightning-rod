import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../service/courses.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  courses: Observable<any[]>;
  constructor(private _coursesService: CoursesService) {
    this.courses = _coursesService.getDummyFromFirebase();
  }

  // courses = [
  //   {
  //     title: 'Web application development',
  //     code: 'COMP5347',
  //     instructor: 'Ying Zhou',
  //     brief: 'Web application 是一门教制作网站的课，主要教授的技术栈是MEAN，即MongoDB，ExpressJS，Angular，NodeJS',
  //     cols: 1,
  //     rows: 1,
  //     tags: [
  //       {name: '比较实用', upvote: '10', downvote: '1', color: 'accent'},
  //       {name: '大作业比较费事', upvote: '9', downvote: '1', color: 'primary'},
  //       {name: 'No suprise', upvote: '7', downvote: '1', color: 'default'},
  //       {name: '考试贼烦', upvote: '5', downvote: '1', color: 'default'}],
  //     color: 'lightblue',
  //     logo: `url('../../../assets/img/usyd.png')`
  //   },
  //   {
  //     title: 'Project Management',
  //     code: 'INFO6007',
  //     instructor: 'Bernald Wong',
  //     brief: 'Project Management 是一门管理课，曾经有恐怖的30%的挂科率，后来换了个华裔老师后，挂科率降下来了。上课纯吹牛，考试靠自己读教材',
  //     cols: 1,
  //     rows: 1,
  //     tags: [
  //       {name: '上课比较扯淡', upvote: '19', downvote: '1', color: 'accent'},
  //       {name: '没啥作业', upvote: '11', downvote: '1', color: 'primary'},
  //       {name: 'Bernald Wong威武', upvote: '10', downvote: '1', color: 'default'},
  //       {name: '选周五的课', upvote: '8', downvote: '1', color: 'default'},
  //       {name: '考试不知道考的啥', upvote: '5', downvote: '1', color: 'default'},
  //       {name: '看选择题', upvote: '3', downvote: '1', color: 'default'}],
  //     color: 'lightblue',
  //     logo: `url('../../../assets/img/usyd.png')`
  //   },
  //   {
  //     title: 'Cloud Computing',
  //     code: 'COMP5349',
  //     instructor: 'Uwe',
  //     brief: 'Web application 是一门教制作网站的课，主要教授的技术栈是MEAN，即MongoDB，ExpressJS，Angular，NodeJS',
  //     cols: 1,
  //     rows: 1,
  //     tags: [
  //       {name: '比较实用', upvote: '10', downvote: '1', color: 'accent'},
  //       {name: '大作业比较费事', upvote: '10', downvote: '1', color: 'primary'},
  //       {name: '考试贼烦', upvote: '10', downvote: '1', color: 'default'}],
  //     color: 'lightblue',
  //     logo: `url('../../../assets/img/usyd.png')`
  //   },
  //   {
  //     title: 'IT Innovation',
  //     code: 'INFO5992',
  //     instructor: 'Jinman Kim',
  //     brief: 'Web application 是一门教制作网站的课，主要教授的技术栈是MEAN，即MongoDB，ExpressJS，Angular，NodeJS',
  //     cols: 1,
  //     rows: 1,
  //     tags: [
  //       {name: '比较实用', upvote: '10', downvote: '1', color: 'accent'},
  //       {name: '大作业比较费事', upvote: '10', downvote: '1', color: 'primary'},
  //       {name: '考试贼烦', upvote: '10', downvote: '1', color: 'default'}],
  //     color: 'lightblue',
  //     logo: `url('../../../assets/img/usyd.png')`
  //   }
  // ];

  ngOnInit() {
    console.log(this._coursesService.getDummy());
  }

}
