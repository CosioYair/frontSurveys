import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterialTableComponent } from 'src/app/shared/components/material/material-table/material-table.component';
import { AddressFormComponent } from 'src/app/shared/components/material/address-form/address-form.component';
import { DragDropComponent } from 'src/app/shared/components/material/drag-drop/drag-drop.component';
import { MaterialDashboardComponent } from 'src/app/shared/components/material/material-dashboard/material-dashboard.component';
import { MaterialNavComponent } from 'src/app/shared/components/material/material-nav/material-nav.component';
import { MaterialTreeComponent } from 'src/app/shared/components/material/material-tree/material-tree.component';

const routes: Routes = [
  { path: '', redirectTo: 'table', pathMatch: 'full' },
  { path: 'table', component: MaterialTableComponent },
  { path: 'address', component: AddressFormComponent },
  { path: 'drag-drop', component: DragDropComponent },
  { path: 'dashboard', component: MaterialDashboardComponent },
  { path: 'nav', component: MaterialNavComponent },
  { path: 'tree', component: MaterialTreeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialRoutingModule {}
