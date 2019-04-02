import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatSnackBarModule} from '@angular/material';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {appEffects} from '@store/effects';
import {AccountModule} from '../account/account.module';
import {AccountGuard} from '../account/account.guard';
import {reducers, reducersProvider} from '@store/reducers/index';
import {StoreFacadeService} from '@shared/services/storeFacade.service';
import {ErrorService} from '@shared/services/error.service';

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
    AppRouting,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(appEffects),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ...storeDevTools,
    AccountModule,
    MatSnackBarModule
  ],
  providers: [
    AccountGuard,
    reducersProvider,
    StoreFacadeService,
    ErrorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
