import { Routes, RouterState, RouterModule } from "@angular/router";
import { TrainingComponent } from './training.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [

  {path: 'training', component: TrainingComponent}
];

@NgModule({

  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TrainingRoutingModule {}
