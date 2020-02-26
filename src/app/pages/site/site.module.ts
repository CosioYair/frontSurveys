import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteRoutingModule } from './site-routing.module';
import { LandingComponent } from './landing/landing.component';
import { ContactComponent } from './contact/contact.component';
import { PricesComponent } from './prices/prices.component';
import { MaterialModule } from '../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    LandingComponent,
    ContactComponent,
    PricesComponent,
  ],
  imports: [CommonModule, SiteRoutingModule, MaterialModule, FlexLayoutModule]
})
export class SiteModule {}
