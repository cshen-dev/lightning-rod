import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  constructor(private router: Router) { }

  ngOnInit() {
    window['ga']('create', 'UA-115181807-1', 'auto');

    this.router.events.subscribe( event => {
      if (event instanceof NavigationEnd) {
        window['ga']('send', 'pageview', this.router.url);
      }
    });
  }
}
