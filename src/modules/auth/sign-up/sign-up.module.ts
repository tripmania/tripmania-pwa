import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up.component';
import {MatButtonModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [SignUpComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [SignUpComponent]
})
export class SignUpModule { }
