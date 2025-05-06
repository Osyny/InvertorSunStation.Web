import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TableModule } from 'primeng/table';

import { NgSelectModule } from '@ng-select/ng-select';
import { CreateEditPanelComponent } from './dashboard/create-edit-panel/create-edit-panel.component';
import { ViewSolarPanelComponent } from './dashboard/view-solar-panel/view-solar-panel.component';
import { ConfiguratorComponent } from './dashboard/configurator/configurator.component';
import { DropdownModule } from 'primeng/dropdown';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    CreateEditPanelComponent,
    ViewSolarPanelComponent,
    ConfiguratorComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TableModule,
    // DropdownModule,
    NgSelectModule,
    DropdownModule,
    BsDropdownModule,
  ],
})
export class AdminModule {}
