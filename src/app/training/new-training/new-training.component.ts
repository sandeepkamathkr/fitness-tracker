import {Component, OnDestroy, OnInit} from '@angular/core';
import {TrainingService} from "../training.service";
import {AngularFirestore} from "angularfire2/firestore";
import {Exercise} from "../exercise.model";
import {NgForm} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {UIService} from "../../shared/ui.service";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../app.reducer";
import * as UI from "../../shared/ui.action";

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  exercises: Exercise[];
  isLoading$: Observable<boolean>;
  private exerciseSubscription: Subscription;

  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) {
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.store.dispatch(new UI.StartLoading());
    this.exerciseSubscription = this.trainingService.exercisesChanged
      .subscribe(
        exercises => {
          this.exercises = exercises;
          this.store.dispatch(new UI.StopLoading());
        }
      );
    this.fetchExercises()
  }

  fetchExercises() {
    this.trainingService.fetchAvaliableExercises();
  }

  onStartTraining(form: NgForm): void {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy() {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
  }
}
