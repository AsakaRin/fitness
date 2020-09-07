import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.module';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  exercises: Exercise[];
  exerciseForm: FormGroup;
  exerciseSubscription: Subscription;

  @Output() trainingStart = new EventEmitter<void>();

  constructor(
    private trainingService: TrainingService,
    private formBuild: FormBuilder,
    ) { }

  ngOnInit() {

    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(res => {

      this.exercises = res;
    })

    this.trainingService.getAvailableExercise();

    this.exerciseForm = this.formBuild.group({

      exerciseId: ['', Validators.required],
    })
  }

  get f() { return this.exerciseForm.controls };

  onStart() {

    this.trainingService.startExercise(this.f.exerciseId.value);
  }

  ngOnDestroy() {

    this.exerciseSubscription.unsubscribe();
  }

}
