import { Component, OnInit } from '@angular/core';
// import $ from 'jquery';

@Component({
  selector: 'app-bottom-app',
  templateUrl: './bottom-app.component.html',
})
export class BottomAppComponent implements OnInit {
  mssg = "You've reached the end. C'mon click me to top!";

  toTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  constructor() {}

  ngOnInit() {}
}
