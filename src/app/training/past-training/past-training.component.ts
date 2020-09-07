import { Component, OnInit, ViewChild, AfterViewInit, Input, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Exercise } from '../exercise.module';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss']
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  public dataSource = new MatTableDataSource<Exercise>();
  public displayedColumns = ['date', 'name', 'duration', 'calories', 'state']

  public finishedExerciseChanged: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {

    this.finishedExerciseChanged = this.trainingService.finishedExerciseChanged.subscribe(exercises => {

      this.dataSource.data = exercises;
      console.log(exercises);
    })
    this.trainingService.getfinishedExercise();
  }

  ngOnDestroy() {

    this.finishedExerciseChanged.unsubscribe();
  }

  ngAfterViewInit() {

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(value: string) {

    this.dataSource.filter = value.trim().toLowerCase();
  }

}
