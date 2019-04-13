import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {appEffects} from '@store/effects';
import {reducers, reducersProvider} from '@store/reducers/index';
import {StoreFacadeService} from '@shared/services/storeFacade.service';
import {ErrorService} from '@shared/services/error.service';
import {DynamicLoaderService} from '@modules/dynamic-loader/dynamic-loader.service';
import {AccountModule} from '@modules/account/account.module';
import {AccountGuard} from '@modules/account/account.guard';

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
    DynamicLoaderService,
    reducersProvider,
    StoreFacadeService,
    ErrorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
