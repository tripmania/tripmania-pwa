import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from '@shared/interceptors/auth.interceptor';
import {ErrorInterceptor} from '@shared/interceptors/error.interceptor';
import {TripDetailsModule} from '@modules/trips/trip-details/trip-details.module';
import {BottomNavModule} from '@modules/bottom-nav/bottom-nav.module';
import {HomeModule} from '@modules/home/home.module';
import {SearchModule} from '@modules/search/search.module';
import {SettingsModule} from '@modules/settings/settings.module';
import {TripsListModule} from '@modules/trips/trips-list/trips-list.module';
import {ProfileModule} from '@modules/profile/profile.module';
import {CreatorModule} from '@modules/creator/creator.module';
import {HeaderModule} from '@modules/header/header.module';
import {DynamicLoaderModule} from '@modules/dynamic-loader/dynamic-loader.module';
import {TripDetailsComponent} from '@modules/trips/trip-details/trip-details.component';

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
    HomeModule,
    SearchModule,
    SettingsModule,
    TripsListModule,
    ProfileModule,
    CreatorModule,
    HeaderModule,
    HttpClientModule,
    DynamicLoaderModule,
    TripDetailsModule
  ],
  exports: [AccountComponent],
  providers: [
    ...interceptors
  ],
  entryComponents: [TripDetailsComponent]
})
export class AccountModule {
}
