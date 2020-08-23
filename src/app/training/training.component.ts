import {Component, OnInit} from '@angular/core';
import {TrainingService} from "./training.service";
import * as fromTraining from "./training.reducers";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  onGoingTraining$: Observable<boolean>;

  constructor(private trainingService: TrainingService,
              private store: Store<fromTraining.TrainingState>) {
  }

  ngOnInit(): void {
    this.onGoingTraining$ = this.store.select(fromTraining.getIsTraining);
  }
}
