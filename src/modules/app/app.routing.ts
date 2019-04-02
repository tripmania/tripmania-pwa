import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccountGuard} from '../account/account.guard';
import {AccountComponent} from '../account/account.component';
import {appRoutePaths} from '@consts/appRouting.consts';

const routes: Routes = [
  {
    path: appRoutePaths.AUTH,
    loadChildren: '../auth/auth.module#AuthModule'
  },
  {
    path: '',
    component: AccountComponent,
    canActivate: [AccountGuard]
  },
  {
    path: '**',
    component: AccountComponent,
    canActivate: [AccountGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouting {
}
