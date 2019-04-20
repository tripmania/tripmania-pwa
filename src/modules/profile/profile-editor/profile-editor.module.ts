import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileEditorComponent } from './profile-editor.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule, MatInputModule} from '@angular/material';
import {TextFieldModule} from '@angular/cdk/text-field';

@NgModule({
  declarations: [ProfileEditorComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    TextFieldModule
  ],
  exports: [ProfileEditorComponent]
})
export class ProfileEditorModule { }
