import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class UIService {

  loadingStateChanged = new Subject<boolean>();

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message, action, duration) {

    this.snackBar.open(message, action, {

      duration: duration,
    })
  }
}
