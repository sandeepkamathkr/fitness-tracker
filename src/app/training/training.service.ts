import {Exercise} from "./exercise.model";
import {map, take} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {AngularFirestore} from "angularfire2/firestore";
import {Subscription} from "rxjs";
import {UIService} from "../shared/ui.service";
import * as UI from '../shared/ui.actions';
import * as Training from './training.actions';
import * as fromTraining from './training.reducers';
import {Store} from "@ngrx/store";

@Injectable()
export class TrainingService {
  private sbs: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTraining.State>) {
  }

  fetchAvaliableExercises() {
    this.store.dispatch(new UI.StartLoading());
    this.sbs.push(this.db
      .collection("availableExercises")
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
      })).subscribe((excercises: Exercise[]) => {
        this.store.dispatch(new UI.StopLoading());
        this.store.dispatch(new Training.SetAvailableTrainings(excercises));
      }, error => {
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackbar('Fetching Exercises failed, please try again later', null, 3000);
      }));
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new Training.StartTraining(selectedId));
  }

  completeExercise() {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
      this.addDataToDatabase({...ex, date: new Date(), state: "Completed"});
      this.store.dispatch(new Training.StopTraining());
    });
  }

  cancelExercise(progress: number) {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
      this.addDataToDatabase({
        ...ex,
        date: new Date(),
        state: "Cancelled",
        duration: ex.duration * (progress / 100),
        calories: ex.calories * (progress / 100)
      });
      this.store.dispatch(new Training.StopTraining());
    });

  }

  fetchCompletedOrCancelledExercises() {
    this.sbs.push(this.db.collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises: Exercise[]) => {
        this.store.dispatch(new Training.SetFinishedTrainings(exercises));
      }));
  }

  cancelSubscription() {
    this.sbs.forEach(subscription => subscription.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
