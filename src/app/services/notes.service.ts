import { NotesInfo } from '../../database/notes.data';
import { NotesStateService } from './notes-state.service';
import { Injectable } from '@angular/core';
// import { LoaderService } from '../../../services/loader.service';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private _configsLoader = {
    text: 'please wait...',
    fgsColor: 'red',
    bgsOpacity: 1,
    blur: 15,
    bgsType: 'circle',
  };

  private _notesInfo: NotesInfo[] = [];

  get configs(): any {
    return this._configsLoader;
  }

  get notesInfo(): NotesInfo[] {
    return this._notesInfo;
  }

  constructor() {}
}
