import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import {PerformanceReviewsComponent} from './performance-reviews/performance-reviews.component';

const routes: Routes = [
  {
    path : '',
    component: EmployeeListComponent
  },
  {
    path : 'performance/:employeeId',
    component: PerformanceReviewsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
