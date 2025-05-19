import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';

import { AppComponentBase } from '../../shared/app-component-base';
import { TableLazyLoadEvent } from 'primeng/table';
import { PrimengTableHelper } from '../../helpers/primeng-table-helper';

import { finalize, Subject, takeUntil } from 'rxjs';

import {
  SolarPanelDto,
  SolarPanelsResponse,
} from '../../models/solar-panels/solar-panel.dto';
import { SolarPanelService } from '../../services/solar-panel/solar-panel.service';
import { SolarPanelDisplayedDto } from '../../models/solar-panels/solar-panel.displayed.dto';
import { BsModalService } from 'ngx-bootstrap/modal';

import { FilterInput } from '../solar-panels/dtos/filter-input';
import { ViewSolarPanelComponent } from '../solar-panels/view-solar-panel/view-solar-panel.component';
import { ConfiguratorComponent } from '../solar-panels/configurator/configurator.component';
import { ModalMessagesComponent } from '../../shared/modal-messages/modal-messages.component';
import { ToastrService } from 'ngx-toastr';
import { CreateEditPanelComponent } from '../solar-panels/create-edit-panel/create-edit-panel.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent extends AppComponentBase implements OnInit {
  solarPanels: SolarPanelDto[] = [];
  loading = false;

  rows = 8;
  first = 0;
  filterText!: string;
  totalRecords: number = 0;
  inputData = new FilterInput();

  test: any;

  $unsubscribe = new Subject<void>();
  private readonly _primengTableHelper = new PrimengTableHelper();

  constructor(
    injector: Injector,
    private authService: AuthService,
    private router: Router
  ) {
    super(injector);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }

  click() {
    this.router.navigateByUrl('admin/solar-panel');
  }

  startCommand() {}
}
