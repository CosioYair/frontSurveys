import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CompanyComponent } from './company.component';
import { NgxPermissionsModule, NgxPermissionsGuard } from 'ngx-permissions';
import { ProfileCompletedGuard } from 'src/app/shared/guard/profile-completed.guard';

const routes: Routes = [{
  path: '',
  component: CompanyComponent,
  children: [
    { path: '', redirectTo: 'update', pathMatch: 'full' },
    // tslint:disable-next-line: max-line-length
    {
      path: 'update',
      loadChildren: () => import('./update/update.module').then(m => m.UpdateModule)
    },
    {
      path: 'employees',
      loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesModule),
      canActivate: [NgxPermissionsGuard, ProfileCompletedGuard],
      data: {
        permissions: {
          only: 'SE',
          redirectTo: '/company'
        }
      }
    },
    {
      path: 'new-employee',
      loadChildren: () => import('./new-employee/new-employee.module').then(m => m.NewEmployeeModule),
      canActivate: [NgxPermissionsGuard, ProfileCompletedGuard],
      data: {
        permissions: {
          only: 'CE',
          redirectTo: '/company'
        }
      }
    },
    {
      path: 'update-employee/:Oid',
      loadChildren: () => import('./update-employee/update-employee.module').then(m => m.UpdateEmployeeModule),
      canActivate: [NgxPermissionsGuard, ProfileCompletedGuard],
      data: {
        permissions: {
          only: 'UE',
          redirectTo: '/company'
        }
      }
    },
  ]
}];

@NgModule({
  declarations: [CompanyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FlexLayoutModule,
    NgxPermissionsModule.forChild()
  ]
})
export class CompanyModule { }
