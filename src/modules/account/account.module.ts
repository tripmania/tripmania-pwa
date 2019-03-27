import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import {BottomNavModule} from '../bottom-nav/bottom-nav.module';
import {HomeModule} from '../home/home.module';
import {SearchModule} from '../search/search.module';
import {SettingsModule} from '../settings/settings.module';
import {TripsListModule} from '../trips/tripsList/tripsList.module';
import {ProfileModule} from '../profile/profile.module';
import {HeaderModule} from '../header/header.module';

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
    HeaderModule
  ],
  exports: [AccountComponent]
})
export class AccountModule {
}
