import {Component, OnDestroy, OnInit} from '@angular/core';
import {TrainingService} from "../training.service";
import {AngularFirestore} from "angularfire2/firestore";
import {Exercise} from "../exercise.model";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  exercises: Exercise[];
  isLoading: boolean = false;
  private exerciseSubsription: Subscription;

  constructor(private trainingService: TrainingService,
              private db: AngularFirestore) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.exerciseSubsription = this.trainingService.exercisesChanged
      .subscribe(
        exercises => {
          this.exercises = exercises;
          this.isLoading = false;
        }
      );
    this.trainingService.fetchAvaliableExercises();
  }

  onStartTraining(form: NgForm): void {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy() {
    this.exerciseSubsription.unsubscribe();
  }
}
