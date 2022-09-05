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
  categoriesList$: Observable<NotesCategory[]> =
    this.noteStateService.categories$;

  constructor(
    private fb: FormBuilder,
    private noteStateService: NotesStateService
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
      });
    }
  }

  patchForm(note: NotesInfo) {
    this.createOrEditForm.patchValue({
      title: note.title,
      textInfo: note.content,
      category: note.category,
    });
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
    });
    this.cancelAction();
  }

  editNote() {
    this.onEditNote.emit();
  }

  cancelAction() {
    this.onCancel.emit();
  }
}
