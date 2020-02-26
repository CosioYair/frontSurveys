import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { Routes, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/material.module';
import * as UserRoutingModule from './user-routing.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { FeatherIconsComponent } from 'src/app/shared/components/feather-icons/feather-icons.component';
import { SharedModule } from 'src/app/shared/shared.module';


const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: UserRoutingModule.routes
  }
];

@NgModule({
  declarations: [
    UserComponent,
  ],
  exports: [FeatherIconsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    SharedModule,
    MaterialModule,
    NgxPermissionsModule.forChild(),
    SharedModule,
  ],
  providers: [
  ]
})
export class UserModule { }
