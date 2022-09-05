import { environment } from './../../environments/environment';
import { NotesCategory, NotesInfo } from './../../database/notes.data';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotesRepositoryService {
  constructor(private http: HttpClient) {}

  getNotesInfo(): Observable<NotesInfo[]> {
    return this.http.get<NotesInfo[]>(`${environment.base_url}/notes`);
  }

  getCategories(): Observable<NotesCategory[]> {
    return this.http.get<NotesCategory[]>(`${environment.base_url}/categories`);
  }

  createNote(note: NotesInfo): Observable<NotesInfo> {
    return this.http.post<NotesInfo>(`${environment.base_url}/notes`, note);
  }

  updateNote(note: NotesInfo): Observable<NotesInfo> {
    return this.http.put<NotesInfo>(
      `${environment.base_url}/notes/` + note.id,
      note
    );
  }

  deleteNote(note: NotesInfo): Observable<void> {
    return this.http.delete<void>(`${environment.base_url}/notes/` + note.id);
  }
}
