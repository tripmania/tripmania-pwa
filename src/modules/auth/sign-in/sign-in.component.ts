import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';

const FORM_CONTROLS = {
  LOGIN: 'login',
  PASSWORD: 'password'
};

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less']
})
export class SignInComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      [FORM_CONTROLS.LOGIN]: ['', [Validators.required]],
      [FORM_CONTROLS.PASSWORD]: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const login = this.form.get(FORM_CONTROLS.LOGIN).value;
    const password = this.form.get(FORM_CONTROLS.PASSWORD).value;

    this.authService.signIn(login, password);
  }
}
