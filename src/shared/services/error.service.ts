import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class ErrorService {
  constructor(private snackBar: MatSnackBar) {
  }

  showErrorMessage({error}: any) {
    this.snackBar.open(error.message, '', {
      duration: 3000,
      horizontalPosition: 'center'
    });
  }
}
