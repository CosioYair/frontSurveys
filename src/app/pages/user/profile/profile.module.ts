import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserComponent } from './user/user.component';
import { EmployeeComponent } from './employee/employee.component';
import { SharedModule } from 'src/app/shared/shared.module';


const routes: Routes = [{
  path: '',
  component: ProfileComponent,
}];

@NgModule({
  declarations: [
    ProfileComponent,
    UserComponent,
    EmployeeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FlexLayoutModule,
    NgxPermissionsModule.forChild(),
    NgbModule,
    SharedModule
  ],
  exports: [RouterModule]
})
export class ProfileModule { }
