import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionbillingComponent } from './subscriptionbilling.component';
import { MaterialModule } from 'src/app/material.module';
import { Routes, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [{
  path: '',
  component: SubscriptionbillingComponent,
}];

@NgModule({
  declarations: [SubscriptionbillingComponent],
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
export class SubscriptionbillingModule { }
