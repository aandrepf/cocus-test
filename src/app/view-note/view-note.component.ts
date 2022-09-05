import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-view-note',
  templateUrl: './view-note.component.html',
})
export class ViewNoteComponent implements OnInit {
  @Input() note: any;
  @Output() onView = new EventEmitter();
  @Output() onDelete = new EventEmitter();

  doneViewing(e: any) {
    this.onView.emit(e);
  }

  deleteNote(e: any) {
    e.preventDefault();
    this.onDelete.emit(this.note.id);
  }

  constructor() {}

  ngOnInit() {}
}
