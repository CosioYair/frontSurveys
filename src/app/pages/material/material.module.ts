import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialRoutingModule } from './material-routing.module';
import { MaterialTableComponent } from 'src/app/shared/components/material/material-table/material-table.component';
import { AddressFormComponent } from 'src/app/shared/components/material/address-form/address-form.component';
import { MaterialNavComponent } from 'src/app/shared/components/material/material-nav/material-nav.component';
import { MaterialDashboardComponent } from 'src/app/shared/components/material/material-dashboard/material-dashboard.component';
import { MaterialTreeComponent } from 'src/app/shared/components/material/material-tree/material-tree.component';
import { DragDropComponent } from 'src/app/shared/components/material/drag-drop/drag-drop.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTreeModule } from '@angular/material/tree';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AddressFormComponent,
    MaterialNavComponent,
    MaterialTableComponent,
    MaterialDashboardComponent,
    MaterialTreeComponent,
    DragDropComponent
  ],
  imports: [
    CommonModule,
    MaterialRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatMenuModule,
    MatTreeModule,
    DragDropModule
  ]
})
export class MaterialModule {}
