import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import {BottomNavModule} from '../bottom-nav/bottom-nav.module';
import {HomeModule} from '../home/home.module';
import {SearchModule} from '../search/search.module';
import {SettingsModule} from '../settings/settings.module';
import {TripsListModule} from '../trips/trips-list/trips-list.module';
import {ProfileModule} from '../profile/profile.module';
import {HeaderModule} from '../header/header.module';
import {CreatorModule} from '../creator/creator.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from '@shared/interceptors/auth.interceptor';
import {ErrorInterceptor} from '@shared/interceptors/error.interceptor';
import {DynamicLoaderModule} from '../dynamic-loader/dynamic-loader.module';
import {DynamicLoaderService} from '../dynamic-loader/dynamic-loader.service';
import {TripDetailsComponent} from '../trips/trip-details/trip-details.component';

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
    DynamicLoaderModule
  ],
  exports: [AccountComponent],
  providers: [
    DynamicLoaderService,
    ...interceptors
  ],
  entryComponents: [TripDetailsComponent]
})
export class AccountModule {
}
