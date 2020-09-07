import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit, OnDestroy {

  public ongoingTraining = false;
  exerciseSubscribable: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {

    this.exerciseSubscribable = this.trainingService.exerciseChanged.subscribe(exercise => {

      if (exercise) {

        this.ongoingTraining = true;
      }
      else {

        this.ongoingTraining = false;
      }
    })
  }

  ngOnDestroy() {

    this.exerciseSubscribable.unsubscribe();
  }

}
