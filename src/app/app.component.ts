import { NotesStateService } from './services/notes-state.service';
import {
  NotesCategory,
  NotesInfo,
  NotesFilter,
} from './../database/notes.data';
import { Component, HostListener, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { NgxUiLoaderConfig } from 'ngx-ui-loader';
import { LoaderService } from './services/loader.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  options: FormGroup;
  config: NgxUiLoaderConfig;
  subscriber: Subscription;

  isCreate = true;
  noteInfoToShow: NotesInfo;
  categoriesList$: Observable<NotesCategory[]> =
    this.noteStateService.categories$;

  notesFilter$: Observable<NotesFilter> = this.noteStateService.filter$;
  filterApp = new NotesFilter();
  isToListView = true;
  sideLeft = 'side';
  sideRight = 'over';

  constructor(fb: FormBuilder, private noteStateService: NotesStateService, private loader: LoaderService) {
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
    this.subscriber = this.loader.config.subscribe(
      (config) => (this.config = config)
    );
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

  ngOnDestroy(): void {
      if (this.subscriber) {
      this.subscriber.unsubscribe();
    }
  }
}
