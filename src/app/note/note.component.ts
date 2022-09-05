import { NotesStateService } from './../services/notes-state.service';
import { NotesInfo } from './../../database/notes.data';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
})
export class NoteComponent implements OnInit {
  @Input() note: NotesInfo;
  @Input() classToChangeView;
  @Output() onDelete = new EventEmitter();
  @Output() onEditNote = new EventEmitter();

  viewNote = false;

  constructor(private noteStateService: NotesStateService) {}

  ngOnInit() {}

  noteDetail(e: any) {
    e.preventDefault();
    this.viewNote = !this.viewNote;
  }

  deleteThisNote(note: NotesInfo) {
    this.noteStateService.delete(note);
  }

  editThisNote(note: NotesInfo) {
    this.onEditNote.emit(note);
  }
}
