import {Component, OnInit} from '@angular/core';
import {TrainingService} from "../training.service";
import {AngularFirestore} from "angularfire2/firestore";
import {Exercise} from "../exercise.model";
import {NgForm} from "@angular/forms";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  exercises: Observable<Exercise[]>;

  constructor(private trainingService: TrainingService,
              private db: AngularFirestore) {
  }

  ngOnInit(): void {
    this.exercises = this.db.collection("availableExercises")
      .snapshotChanges()
      .pipe(map(docArray => {
        return docArray.map(doc => {
          // @ts-ignore
          const {duration, calories, name} = doc.payload.doc.data();
          return {
            id: doc.payload.doc.id,
            name: name,
            duration: duration,
            calories: calories
          }
        })
      }));
  }

  onStartTraining(form: NgForm): void {
    this.trainingService.startExercise(form.value.exercise);
  }
}
