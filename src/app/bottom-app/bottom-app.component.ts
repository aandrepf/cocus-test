import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bottom-app',
  templateUrl: './bottom-app.component.html',
})
export class BottomAppComponent implements OnInit {
  message = "You've reached the end. C'mon click me to top!";

  toTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  constructor() {}

  ngOnInit() {}
}
