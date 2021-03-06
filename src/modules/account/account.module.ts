import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from '@shared/interceptors/auth.interceptor';
import {ErrorInterceptor} from '@shared/interceptors/error.interceptor';
import {BottomNavModule} from '@modules/bottom-nav/bottom-nav.module';
import {HeaderModule} from '@modules/header/header.module';
import {DynamicLoaderModule} from '@modules/dynamic-loader/dynamic-loader.module';
import {StaticLoaderModule} from '@modules/static-loader/static-loader.module';
import {TripDetailsModule} from '@modules/trips/trip-details/trip-details.module';
import {TripDetailsComponent} from '@modules/trips/trip-details/trip-details.component';
import {TripsListModule} from '@modules/trips/trips-list/trips-list.module';
import {ProfileModule} from '@modules/profile/profile.module';
import {SearchModule} from '@modules/search/search.module';
import {HomeModule} from '@modules/home/home.module';
import {SettingsModule} from '@modules/settings/settings.module';
import {CreatorModule} from '@modules/creator/creator.module';
import {TripsListComponent} from '@modules/trips/trips-list/trips-list.component';
import {ProfileComponent} from '@modules/profile/profile.component';
import {SearchComponent} from '@modules/search/search.component';
import {HomeComponent} from '@modules/home/home.component';
import {SettingsComponent} from '@modules/settings/settings.component';
import {CreatorComponent} from '@modules/creator/creator.component';
import {PreventHistoryBackService} from '@shared/services/prevent-history-back.service';
import {StoreModule} from '@ngrx/store';
import {reducers, reducersProvider} from '@store/reducers';
import {EffectsModule} from '@ngrx/effects';
import {appEffects} from '@store/effects';
import {AppStateService} from '@shared/services/storeFacadeServices/app-state.service';
import {UserService} from '@shared/services/storeFacadeServices/user.service';
import {TripsService} from '@shared/services/storeFacadeServices/trips.service';
import {FilesService} from '@shared/services/files.service';
import {clearStates} from '@shared/helpers/clearStates';

const interceptors = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  // Must be the last
  {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
];

@NgModule({
  declarations: [AccountComponent],
  imports: [
    CommonModule,
    BottomNavModule,
    HeaderModule,
    DynamicLoaderModule,
    StaticLoaderModule,
    TripDetailsModule,
    TripsListModule,
    ProfileModule,
    SearchModule,
    HomeModule,
    SettingsModule,
    CreatorModule,
    StoreModule.forRoot(reducers, {metaReducers: [clearStates]}),
    EffectsModule.forRoot(appEffects),
    HttpClientModule
  ],
  exports: [AccountComponent],
  entryComponents: [
    TripDetailsComponent,
    TripsListComponent,
    ProfileComponent,
    SearchComponent,
    HomeComponent,
    SettingsComponent,
    CreatorComponent
  ],
  providers: [
    ...interceptors,
    PreventHistoryBackService,
    reducersProvider,
    AppStateService,
    UserService,
    TripsService,
    FilesService
  ]
})
export class AccountModule {
}
