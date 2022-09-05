import { NotesCategory } from './../../database/notes.data';
import { NotesRepositoryService } from './notes.repository';
import { StateService } from '../core/state.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { NotesFilter, NotesInfo } from '../../database/notes.data';
import { map, shareReplay } from 'rxjs/operators';
import { isNgTemplate } from '@angular/compiler';

interface NotesState {
  notesList: NotesInfo[];
  categories: NotesCategory[];
  noteId: string | undefined;
  filter: NotesFilter;
}

const initialState: NotesState = {
  notesList: [],
  categories: [],
  noteId: undefined,
  filter: {
    search: '',
    category: '',
    isToCreate: true,
  },
};

@Injectable({
  providedIn: 'root',
})
export class NotesStateService extends StateService<NotesState> {
  private notesFiltered$: Observable<NotesInfo[]> = this.select((state) => {
    return this.getNotesFilteredBySearchInput(state.notesList, state.filter);
  });

  notesList$: Observable<NotesInfo[]> = this.notesFiltered$.pipe(
    map((notes) => notes)
  );
  filter$: Observable<NotesFilter> = this.select((state) => state.filter);
  categories$: Observable<NotesCategory[]> = this.select(
    (state) => state.categories
  );

  selectedNote$: Observable<NotesInfo> = this.select((state) => {
    if (state.noteId === undefined) {
      return new NotesInfo();
    }
    return state.notesList.find((item) => item.id === state.noteId);
  }).pipe(
    // Multicast to prevent multiple executions due to multiple subscribers
    shareReplay({ refCount: true, bufferSize: 1 })
  );

  constructor(private notesRepository: NotesRepositoryService) {
    super(initialState);
    this.initNotes();
    this.initCategories();
  }

  initNotes() {
    this.notesRepository
      .getNotesInfo()
      .subscribe((notes) => this.setState({ notesList: notes }));
  }

  initCategories() {
    this.notesRepository
      .getCategories()
      .subscribe((categories) => this.setState({ categories }));
  }

  updateFilter(filter: NotesFilter) {
    this.setState({
      filter: {
        ...this.notesState.filter,
        ...filter,
      },
    });
  }

  create(note: NotesInfo) {
    this.notesRepository.createNote(note).subscribe((ret) => {
      this.setState({
        notesList: [...this.notesState.notesList, ret],
        noteId: ret.id,
      });
    });
  }

  update(note: NotesInfo) {
    this.notesRepository.updateNote(note).subscribe((ret) => {
      this.setState({
        notesList: this.notesState.notesList.map((item) =>
          item.id === note.id ? ret : item
        ),
      });
    });
  }

  delete(note: NotesInfo) {
    this.notesRepository.deleteNote(note).subscribe(() => {
      this.setState({
        noteId: undefined,
        notesList: this.notesState.notesList.filter(
          (item) => item.id !== note.id
        ),
      });
    });
  }

  getNotesFilteredBySearchInput(
    notes: NotesInfo[],
    filter: NotesFilter
  ): NotesInfo[] {
    return notes.filter((item) => {
      if (
        item.category.toUpperCase().indexOf(filter.category.toUpperCase()) >
          -1 &&
        item.category !== '' &&
        (item.title.toUpperCase().indexOf(filter.search.toUpperCase()) > -1 ||
          item.content.toUpperCase().includes(filter.search.toUpperCase()))
      ) {
        return item;
      }
    }).reverse();
    // .sort((a, b) =>
    //   new Date(a.time) > new Date(b.time)
    //     ? 1
    //     : new Date(b.time) > new Date(a.time)
    //     ? -1
    //     : 0
    // );
  }
}
