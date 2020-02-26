import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurveyCatComponent } from './survey-cat/survey-cat.component';
import { SurveyQuestComponent } from './survey-quest/survey-quest.component';
import { DetailComponent } from './survey-quest/detail/detail.component';
import { NewComponent } from './survey-quest/new/new.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


export const routes: Routes = [
  { path: '', redirectTo: 'surveyCat' },
  { path: 'surveyCat', component: SurveyCatComponent, canActivate: [] },
  { path: 'surveyQuest', component: SurveyQuestComponent, canActivate: [] },
  { path: 'surveyQuest/detail/:Oid', component: DetailComponent, canActivate: [] },
  { path: 'surveyQuest/new', component: NewComponent, canActivate: [] },
];


@NgModule({
  declarations: [
    SurveyCatComponent,
    SurveyQuestComponent,
    DetailComponent,
    NewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
