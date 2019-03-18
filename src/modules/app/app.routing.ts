import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccountGuard} from '../account/account.guard';
import {AccountComponent} from '../account/account.component';

const routes: Routes = [
  {
    path: '',
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
