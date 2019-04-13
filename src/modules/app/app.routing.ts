import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {appRoutePaths} from '@consts/appRouting.consts';
import {AccountComponent} from '@modules/account/account.component';
import {AccountGuard} from '@modules/account/account.guard';

const routes: Routes = [
  {
    path: appRoutePaths.AUTH,
    loadChildren: '../auth/auth.module#AuthModule'
  },
  {
    path: '',
    component: AccountComponent,
    canActivate: [AccountGuard],
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouting {
}
