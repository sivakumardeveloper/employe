import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  constructor(private _SnackBar:MatSnackBar) { }
  openSnackBar(message:string,action:string ="ok") {
    this._SnackBar.open(message,action,{
      duration:1000,
      verticalPosition:'top'
    })
  }
}
