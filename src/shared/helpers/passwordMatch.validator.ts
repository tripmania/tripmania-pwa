import {FormControl, ValidatorFn} from '@angular/forms';

export function passwordMatchValidator(passwordControlName: string): ValidatorFn {
  let password: FormControl;
  let repeatPassword: FormControl;

  return (control: FormControl) => {
    if (!control.parent) {
      return null;
    }

    repeatPassword = control;
    password = control.parent.get(passwordControlName) as FormControl;

    if (!password.value) {
      return null;
    } else if (password.value !== repeatPassword.value) {
      return {
        passwordMatch: true
      };
    }

    return null;
  };
}
