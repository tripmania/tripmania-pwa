import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {AuthComponent} from './auth.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'sign-in',
        component: SignInComponent,
        pathMatch: 'full'
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
        pathMatch: 'full'
      },
      {
        path: '',
        component: SignInComponent,
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'sign-in'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRouting {
}
