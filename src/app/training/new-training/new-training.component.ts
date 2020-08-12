import {Component, OnDestroy, OnInit} from '@angular/core';
import {TrainingService} from "../training.service";
import {AngularFirestore} from "angularfire2/firestore";
import {Exercise} from "../exercise.model";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {UIService} from "../../shared/ui.service";

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  exercises: Exercise[];
  isLoading: boolean = true;
  private exerciseSubscription: Subscription;
  private loadingSubscription: Subscription;

  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore,
    private uiService: UIService
  ) {
  }

  ngOnInit(): void {
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
      isLoading => {
        this.isLoading = isLoading;
      }
    );
    this.exerciseSubscription = this.trainingService.exercisesChanged
      .subscribe(
        exercises => {
          this.exercises = exercises;
          this.isLoading = false;
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
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }
}
