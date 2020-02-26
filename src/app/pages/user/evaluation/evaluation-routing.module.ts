import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EvaluationComponent } from './evaluation.component';
import { EmployeeInfoComponent } from './employee-info/employee-info.component';
import { SurveyEmployeeComponent } from './survey-employee/survey-employee.component';
import { EvaluationListComponent } from './evaluation-list/evaluation-list.component';


const routes: Routes = [
  { path: '', component: EvaluationComponent },
  { path: 'new-evaluation', loadChildren: () => import('./new-evaluation/new-evaluation.module').then(m => m.NewEvaluationModule), },
  {
    path: 'evaluation-enabled-list',
    loadChildren: () => import('./evaluation-enabled-list/evaluation-enabled-list.module').then(m => m.EvaluationEnabledListModule)
  },
  { path: 'list', component: EvaluationListComponent },
  { path: 'employeeInfo', component: EmployeeInfoComponent },
  { path: 'surveyEmployee', component: SurveyEmployeeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluationRoutingModule { }
