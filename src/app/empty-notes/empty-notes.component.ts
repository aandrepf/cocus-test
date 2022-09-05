import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-notes',
  templateUrl: './empty-notes.compontent.html',
})
export class EmptyNotesComponent implements OnInit {
  emptyMessage: String = 'There are no notes for you, please create one!!';

  constructor() {}

  ngOnInit() {}
}
