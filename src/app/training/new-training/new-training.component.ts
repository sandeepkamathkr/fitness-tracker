import {Component, OnInit} from '@angular/core';
import {TrainingService} from "../training.service";
import {AngularFirestore} from "angularfire2/firestore";
import {Exercise} from "../exercise.model";
import {NgForm} from "@angular/forms";
import {Observable} from "rxjs";
import {UIService} from "../../shared/ui.service";
import {Store} from "@ngrx/store";
import * as fromTraining from "../training.reducers";
import * as fromRoot from "../../app.reducer";

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  exercises$: Observable<Exercise[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTraining.State>
  ) {
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises);
    this.fetchExercises()
  }

  fetchExercises() {
    this.trainingService.fetchAvaliableExercises();
  }

  onStartTraining(form: NgForm): void {
    this.trainingService.startExercise(form.value.exercise);
  }
}
