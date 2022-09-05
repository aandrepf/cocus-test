import { NotesStateService } from '../services/notes-state.service';
import { NotesInfo } from './../../database/notes.data';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';
// import Notify from 'handy-notification';
// import Notes from '../notes.data';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
})
export class NotesComponent implements OnInit {
  @Input() selectedTodo: NotesInfo;
  @Input() gridOrList = true;
  @Output() selectNote: EventEmitter<NotesInfo> = new EventEmitter();
  @Output() openEditNotes: EventEmitter<boolean> = new EventEmitter(false);

  notesList$: Observable<NotesInfo[]> = this.notesState.notesList$;

  constructor(private notesState: NotesStateService) {}

  ngOnInit() {
    console.log('notes', this.gridOrList);
  }

  itToCreateNote(e: MouseEvent) {
    e.preventDefault();
    this.selectNote.emit(null);
    this.openEditNotes.emit(true);
  }

  isToEditNote(note: NotesInfo) {
    this.selectNote.emit(note);
    this.openEditNotes.emit(false);
  }

  isToClearFilter() {
    this.notesState.updateFilter({
      search: '',
      category: '',
      isToCreate: true,
    });
  }
}
