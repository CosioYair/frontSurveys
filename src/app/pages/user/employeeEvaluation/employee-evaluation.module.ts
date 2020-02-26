import { NgModule } from '@angular/core';
import { EmployeeEvaluationRoutingModule } from './employee-evaluation-routing.module';
import { NgxPermissionsModule } from 'ngx-permissions';



@NgModule({
  declarations: [],
  imports: [
    EmployeeEvaluationRoutingModule,
    NgxPermissionsModule.forChild(),
  ]
})
export class EmployeeEvaluationModule { }
