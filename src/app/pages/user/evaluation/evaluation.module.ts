import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluationRoutingModule } from './evaluation-routing.module';
import { EvaluationComponent } from './evaluation.component';
import { SurveyEmployeeComponent } from './survey-employee/survey-employee.component';
import { EmployeeInfoComponent } from './employee-info/employee-info.component';
import { EvaluationListComponent } from './evaluation-list/evaluation-list.component';
import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    EvaluationComponent,
    SurveyEmployeeComponent,
    EmployeeInfoComponent,
    EvaluationListComponent,
  ],
  imports: [CommonModule, EvaluationRoutingModule, MaterialModule, FlexLayoutModule]
})
export class EvaluationModule {}
