import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscritpionComponent } from './subscritpion.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [{
  path: '',
  component: SubscritpionComponent,
}];

@NgModule({
  declarations: [SubscritpionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FlexLayoutModule,
    NgxPermissionsModule.forChild(),
    NgbModule,
    SharedModule
  ]
})
export class SubscritpionModule { }
