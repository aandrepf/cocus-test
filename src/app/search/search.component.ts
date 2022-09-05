import { NotesFilter } from './../../database/notes.data';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
  notesFilterForm: FormGroup = this.fb.group({
    search: [''],
    category: [''],
    isToCreate: [true],
  });

  @Input()
  set noteFilter(filter: NotesFilter) {
    this.notesFilterForm.setValue(filter, { emitEvent: false });
  }

  @Output()
  noteFilterEmit: EventEmitter<NotesFilter> = new EventEmitter();

  private subs$ = new Subject();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.notesFilterForm
      .get('search')
      .valueChanges.pipe(takeUntil(this.subs$), debounceTime(350))
      .subscribe((value) => {
        this.noteFilterEmit.emit({
          ...this.notesFilterForm.value,
          search: value,
        });
      });
  }

  ngOnDestroy() {
    this.subs$.next();
    this.subs$.complete();
  }
}
