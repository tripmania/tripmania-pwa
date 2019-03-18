import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {appEffects} from '../../store/effects/index';
import {StoreModule} from '@ngrx/store';
import {appReducers} from '../../store/reducers';

const storeDevTools = [];

if (!environment.production) {
  storeDevTools.push(StoreDevtoolsModule.instrument());
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot(appEffects),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ...storeDevTools
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
