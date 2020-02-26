import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewEvaluationComponent } from './new-evaluation.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: NewEvaluationComponent
  }
];

@NgModule({
  declarations: [NewEvaluationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FlexLayoutModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class NewEvaluationModule { }
