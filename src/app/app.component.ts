import { NotesStateService } from './services/notes-state.service';
import {
  NotesCategory,
  NotesInfo,
  NotesFilter,
} from './../database/notes.data';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  options: FormGroup;

  isCreate = true;
  noteInfoToShow: NotesInfo;
  categoriesList$: Observable<NotesCategory[]> =
    this.noteStateService.categories$;

  notesFilter$: Observable<NotesFilter> = this.noteStateService.filter$;
  filterApp = new NotesFilter();
  isToListView = true;

  constructor(fb: FormBuilder, private noteStateService: NotesStateService) {
    this.options = fb.group({
      bottom: 0,
      fixed: false,
      top: 0,
    });
    this.filterApp = {
      search: '',
      category: '',
      isToCreate: true,
    };
  }

  openSideRight(sideNavRight, open) {
    sideNavRight.open();
    this.isCreate = open;
  }

  addNewNote(note: NotesInfo) {
    console.log('create', note);
  }

  editNote(note: NotesInfo) {
    console.log('edit', note);
  }

  noteInfo(note: NotesInfo) {
    this.noteInfoToShow = note;
  }

  filterListByCategory(category: string) {
    this.filterApp.category = category;
    this.filterApp.search = '';
    this.noteStateService.updateFilter(this.filterApp);
  }

  filterUpdate(filter: NotesFilter) {
    this.filterApp.search = filter.search;
    this.filterApp.category = '';

    this.noteStateService.updateFilter(this.filterApp);
  }

  toggleListGridView(toggle: boolean) {
    this.isToListView = toggle;
  }

  returnToggle() {
    return this.isToListView;
  }
}
