import { MaterialModule } from './../shared/material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotesComponent } from './notes/notes.component';
import { NoteComponent } from './note/note.component';
import { EmptyNotesComponent } from './empty-notes/empty-notes.component';
import { BottomAppComponent } from './bottom-app/bottom-app.component';
import { CreateNoteComponent } from './create-note/create-note.component';
import { NotesRepositoryService } from './services/notes.repository';
import { LoaderService } from './services/loader.service';
import { SearchComponent } from './search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { TruncatePipe } from './../pipes/truncate.pipe';
import { TimeAgoExtendsPipe } from './../pipes/timeago.pipe';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

@NgModule({
  declarations: [
    AppComponent,
    NotesComponent,
    NoteComponent,
    EmptyNotesComponent,
    BottomAppComponent,
    CreateNoteComponent,
    SearchComponent,
    TruncatePipe,
    TimeAgoExtendsPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxUiLoaderModule
  ],
  providers: [NotesRepositoryService, LoaderService],
  bootstrap: [AppComponent],
})
export class AppModule {}
