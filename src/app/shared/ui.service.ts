import {Subject} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Injectable} from "@angular/core";

@Injectable()
export class UIService {
  loadingStateChanged: Subject<boolean> = new Subject<boolean>();

  constructor(private snackbar: MatSnackBar) {
  }

  showSnackbar(message: string, action: any, duration: number): void {
    this.snackbar.open(message, action, {
      duration: duration
    })
  }
}
