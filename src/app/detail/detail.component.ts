import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  course = {
    name: 'Web Development Application',
    code: 'COMP5348'
  };

  constructor() { }

  ngOnInit() {
  }

}
