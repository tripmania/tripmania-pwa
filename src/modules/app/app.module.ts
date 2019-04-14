import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material';
import {ErrorService} from '@shared/services/error.service';
import {AccountModule} from '@modules/account/account.module';
import {AccountGuard} from '@modules/account/account.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRouting,
    AccountModule,
    MatSnackBarModule
  ],
  providers: [
    AccountGuard,
    ErrorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
