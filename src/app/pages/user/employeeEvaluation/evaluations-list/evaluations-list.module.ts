import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EvaluationsListComponent } from './evaluations-list.component';

const routes: Routes = [
  {
    path: '',
    component: EvaluationsListComponent
  }
];

@NgModule({
  declarations: [EvaluationsListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FlexLayoutModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class EvaluationsListModule { }
