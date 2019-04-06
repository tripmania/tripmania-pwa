import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class ErrorService {
  constructor(private snackBar: MatSnackBar) {
  }

  showErrorMessage({error}: HttpErrorResponse) {
    this.snackBar.open(error.message, '', {
      duration: 3000,
      horizontalPosition: 'center'
    });
  }
}
