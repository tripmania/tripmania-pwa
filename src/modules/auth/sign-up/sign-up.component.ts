import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {passwordMatchValidator} from '@shared/helpers/passwordMatch.validator';
import {AuthService} from '../auth.service';

const FORM_CONTROLS = {
  NAME: 'name',
  EMAIL: 'email',
  LOGIN: 'login',
  PASSWORD: 'password',
  REPEAT_PASSWORD: 'repeatPassword'
};

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less']
})
export class SignUpComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      [FORM_CONTROLS.NAME]: ['', [Validators.required]],
      [FORM_CONTROLS.EMAIL]: ['', [Validators.required, Validators.email]],
      [FORM_CONTROLS.LOGIN]: ['', [Validators.required, Validators.minLength(4)]],
      [FORM_CONTROLS.PASSWORD]: ['', [Validators.required, Validators.minLength(6)]],
      [FORM_CONTROLS.REPEAT_PASSWORD]:
        ['', [Validators.required, Validators.minLength(6), passwordMatchValidator(FORM_CONTROLS.PASSWORD)]]
    });
  }

  onSubmit() {
    const name = this.form.get(FORM_CONTROLS.NAME).value;
    const email = this.form.get(FORM_CONTROLS.EMAIL).value;
    const login = this.form.get(FORM_CONTROLS.LOGIN).value;
    const password = this.form.get(FORM_CONTROLS.PASSWORD).value;

    if (this.form.invalid) {
      return;
    }

    this.authService.signUp(name, email, login, password);
  }
}
