import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogClose } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {

  @Output() exitTraining = new EventEmitter<void>();

  progress = 0;
  timer: any;

  constructor(private dialog: MatDialog, private trainingService: TrainingService) { }

  ngOnInit() {

    this.startOrExit();
  }

  startOrExit() {

    var step = this.trainingService.getRunningExercise().duration * 1000 / 100;
    this.timer = setInterval(() => {

      if (this.progress >= 100) {

        this.trainingService.onComplete();
        clearInterval(this.timer);
      }
      else {

        this.progress += 1;
      }
    }, step);
  }

  onStop() {

    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {data: {

      progress: this.progress,
    }});

    dialogRef.afterClosed().subscribe(status => {

      if (!status) {

        this.startOrExit();
      }
      else if (status) {

        this.trainingService.onCancel(this.progress);
      }
    })
  }
}
