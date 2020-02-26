import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as AdminRoutingModule from './admin-routing.module';
import { CategoriesComponent } from './categories/categories.component';
import { DimensionsComponent } from './dimensions/dimensions.component';
import { DomainsComponent } from './domains/domains.component';
import { QuestionsComponent } from './questions/questions.component';
import { AdminComponent } from './admin.component';

import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsModule } from 'ngx-permissions';
import { SharedModule } from 'src/app/shared/shared.module';

import { FeatherIconsComponent } from 'src/app/shared/components/feather-icons/feather-icons.component';





const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: AdminRoutingModule.routes
  }
];

@NgModule({
  declarations: [
    CategoriesComponent,
    DimensionsComponent,
    DomainsComponent,
    QuestionsComponent,
    AdminComponent,
  ],
  exports: [FeatherIconsComponent],

  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FlexLayoutModule,
    SharedModule,
    NgxPermissionsModule.forChild(),
    SharedModule,
  ]
})
export class AdminModule { }
