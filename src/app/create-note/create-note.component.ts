import { NotesUtil } from './../../utils/NotesUtils';
import { NotesStateService } from './../services/notes-state.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotesInfo, NotesCategory } from './../../database/notes.data';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  Input,
} from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { normalizeGenFileSuffix } from '@angular/compiler/src/aot/util';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
})
export class CreateNoteComponent implements OnInit, OnChanges {
  @Input() createOrEdit = true;
  @Input() noteToEdit: NotesInfo = null;
  @Output() onCancel = new EventEmitter();
  @Output() onCreateNote = new EventEmitter();
  @Output() onEditNote = new EventEmitter();

  createOrEditForm: FormGroup;
  percentDone = 0;
  uploadSuccess: boolean;
  fileLink = '';
  noteId = '';
  categoriesList$: Observable<NotesCategory[]> =
    this.noteStateService.categories$;

  constructor(
    private fb: FormBuilder,
    private noteStateService: NotesStateService,
    private http: HttpClient
  ) {}

  ngOnInit() {}

  ngOnChanges() {
    if (this.noteToEdit) {
      this.patchForm(this.noteToEdit);
    } else {
      this.createOrEditForm = this.fb.group({
        title: ['', Validators.required],
        textInfo: ['', Validators.required],
        category: ['', Validators.required],
        file: [''],
      });
    }
  }

  upload(files: File[]) {
    //pick from one of the 4 styles of file uploads below
    this.uploadAndProgress(files);
  }

  uploadAndProgress(files: File[]) {
    console.log(files);
    const formData = new FormData();
    Array.from(files).forEach((f) => formData.append('file', f));

    console.log(formData);
    if (JSON.parse(localStorage.getItem('file'))) {
      localStorage.removeItem('file');
    }

    this.http
      .post('https://file.io', formData, {
        reportProgress: true,
        observe: 'events',
      })
      .subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round((100 * event.loaded) / event.total);
        } else if (event instanceof HttpResponse) {
          const b = event.body;
          localStorage.setItem('file', JSON.stringify(b));
          setTimeout(() => {
            this.uploadSuccess = true;
            this.fileLink = JSON.parse(localStorage.getItem('file')).link;

            this.createOrEditForm.value.file = JSON.parse(
              localStorage.getItem('file')
            ).link;
          }, 200);
        }
      });
  }

  patchForm(note: NotesInfo) {
    this.noteId = note.id;
    this.createOrEditForm.patchValue({
      title: note.title,
      textInfo: note.content,
      category: note.category,
      file: note.file,
    });

    if (note.file) {
      this.fileLink = note.file;
      this.uploadSuccess = true;
    }
  }

  selectCategory(category) {
    this.createOrEditForm.value.category = category;
  }

  createNote() {
    this.onCreateNote.emit();
    this.noteStateService.create({
      id: NotesUtil.guid(),
      time: new Date().getTime(),
      title: this.createOrEditForm.value.title,
      content: this.createOrEditForm.value.textInfo,
      category: this.createOrEditForm.value.category,
      file: this.createOrEditForm.value.file,
    });
    this.cancelAction();
  }

  editNote() {
    this.onEditNote.emit();
    this.noteStateService.update({
      id: this.noteId,
      time: new Date().getTime(),
      title: this.createOrEditForm.value.title,
      content: this.createOrEditForm.value.textInfo,
      category: this.createOrEditForm.value.category,
      file: this.createOrEditForm.value.file,
    });
    this.cancelAction();
  }

  cancelAction() {
    this.onCancel.emit();
  }

  deleteFile() {
    this.fileLink = '';
    this.createOrEditForm.value.file = this.fileLink;
    this.uploadSuccess = false;
  }
}
