import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  courses = [
    {
      title: 'Web application development',
      code: 'COMP5347',
      brief: 'Web application 是一门教制作网站的课，主要教授的技术栈是MEAN，即MongoDB，ExpressJS，Angular，NodeJS',
      cols: 1,
      rows: 1,
      tags: [
        {name: '比较实用', upvote: '10', downvote: '1', color: 'accent'},
        {name: '大作业比较费事', upvote: '10', downvote: '1', color: 'primary'},
        {name: '考试贼烦', upvote: '10', downvote: '1', color: 'default'}],
      color: 'lightblue',
      logo: `url('../../../assets/img/usyd.png')`
    },
    {
      title: 'Web application development',
      code: 'COMP5347',
      brief: 'Web application 是一门教制作网站的课，主要教授的技术栈是MEAN，即MongoDB，ExpressJS，Angular，NodeJS',
      cols: 1,
      rows: 1,
      tags: [
        {name: '比较实用', upvote: '10', downvote: '1', color: 'accent'},
        {name: '大作业比较费事', upvote: '9', downvote: '1', color: 'primary'},
        {name: '考试贼烦', upvote: '10', downvote: '1', color: 'default'},
        {name: '考试贼烦', upvote: '8', downvote: '1', color: 'default'},
        {name: '考试贼烦', upvote: '10', downvote: '1', color: 'default'},
        {name: '考试贼烦', upvote: '10', downvote: '1', color: 'default'}],
      color: 'lightblue',
      logo: `url('../../../assets/img/usyd.png')`
    },
    {
      title: 'Web application development',
      code: 'COMP5347',
      brief: 'Web application 是一门教制作网站的课，主要教授的技术栈是MEAN，即MongoDB，ExpressJS，Angular，NodeJS',
      cols: 1,
      rows: 1,
      tags: [
        {name: '比较实用', upvote: '10', downvote: '1', color: 'accent'},
        {name: '大作业比较费事', upvote: '10', downvote: '1', color: 'primary'},
        {name: '考试贼烦', upvote: '10', downvote: '1', color: 'default'}],
      color: 'lightblue',
      logo: `url('../../../assets/img/usyd.png')`
    },
    {
      title: 'Web application development',
      code: 'COMP5347',
      brief: 'Web application 是一门教制作网站的课，主要教授的技术栈是MEAN，即MongoDB，ExpressJS，Angular，NodeJS',
      cols: 1,
      rows: 1,
      tags: [
        {name: '比较实用', upvote: '10', downvote: '1', color: 'accent'},
        {name: '大作业比较费事', upvote: '10', downvote: '1', color: 'primary'},
        {name: '考试贼烦', upvote: '10', downvote: '1', color: 'default'}],
      color: 'lightblue',
      logo: `url('../../../assets/img/usyd.png')`
    }
  ];

  ngOnInit() {
  }

}
