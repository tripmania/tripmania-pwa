import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in.component';
import {MatButtonModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [SignInComponent]
})
export class SignInModule { }
