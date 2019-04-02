import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import {SignInModule} from './sign-in/sign-in.module';
import {SignUpModule} from './sign-up/sign-up.module';
import {AuthRouting} from './auth.routing';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    SignInModule,
    SignUpModule,
    AuthRouting
  ],
  exports: [AuthComponent]
})
export class AuthModule { }
