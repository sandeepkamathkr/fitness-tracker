import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";



@Component({
  selector: 'app-stop-training',
  template: '<h1 mat-dialog-title>Are you sure?</h1>' +
    '<mat-dialog-actions fxLayout="column">' +
    '<mat-dialog-content><p>You already got {{passedData.progress}}%</p></mat-dialog-content>'+
    '<div fxLayout><button mat-button [mat-dialog-close]="true">Yes</button>'+
    '<button mat-button [mat-dialog-close]="false">No</button></div>'+
    '</mat-dialog-actions>'

})
export class StopTrainingComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any ) {

  }


}
