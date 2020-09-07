import { Injectable } from '@angular/core';
import { Exercise } from './exercise.module';
import { Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { UIService } from '../shares/ui.service';

@Injectable({providedIn: 'root'})
export class TrainingService {

  private availableExercise: Exercise[] = [

    {id: 'crunches', name: 'Crunches', duration: 30, calories: 8},
    {id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15},
    {id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18},
    {id: 'burpees', name: 'Burpees', duration: 60, calories: 8}
  ];

  public exercises = [];
  public fbSubs: Subscription[] = [];
  runningExercise: Exercise;
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExerciseChanged = new Subject<Exercise[]>();

  constructor(
    private router: Router,
    private db: AngularFirestore,
    private uiService: UIService,
    ) { }

  getAvailableExercise() {

    this.fbSubs.push(this.db
      .collection('availableExercise')
      .snapshotChanges()
      .pipe(
        map(resArray => {

          return resArray.map(res => {

            return {

              id: res.payload.doc.id,
              name: res.payload.doc.data()['name'],
              duration: res.payload.doc.data()['duration'],
              calories: res.payload.doc.data()['calories'],
            }
          })
        })
      )
      .subscribe(res => {
        this.availableExercise = res;
        this.exercisesChanged.next([...this.availableExercise]);
      }, error => {

        this.uiService.openSnackBar('Fetching Available Exercise failed, please try again later', null, 3000);
      }))

    return this.availableExercise.slice();
  }

  startExercise(selectedId: string) {

    this.runningExercise = this.availableExercise.find(
      ex => ex.id === selectedId
    );
    this.exerciseChanged.next({...this.runningExercise});
  }

  getRunningExercise() {

    return {...this.runningExercise};
  }

  onCancel(progress: number) {

    this.addDatatoDatabase({

      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    })
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  onComplete() {

    this.addDatatoDatabase({

      ...this.runningExercise,
      duration: this.runningExercise.duration,
      calories: this.runningExercise.calories,
      date: new Date(),
      state: 'completed'
    })
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getfinishedExercise() {

    this.fbSubs.push(this.db.collection('finishedExercise').valueChanges().subscribe((exercise: Exercise[]) => {

      this.finishedExerciseChanged.next(exercise);
    }, error => {

      this.uiService.openSnackBar('Fetching Finihsed Exercise failed, please try again later', null, 3000);
    }))
  }

  addDatatoDatabase(exercise: Exercise) {

    this.db.collection('finishedExercise').add(exercise);
  }

  cancelSubscription() {

    this.fbSubs.forEach(sub => sub.unsubscribe());
  }
}
