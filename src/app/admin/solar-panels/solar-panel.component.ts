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

import { FilterInput } from '../../models/filter-input';
import { ViewSolarPanelComponent } from '../solar-panels/view-solar-panel/view-solar-panel.component';
import { ConfiguratorComponent } from '../solar-panels/configurator/configurator.component';
import { ModalMessagesComponent } from '../../shared/modal-messages/modal-messages.component';
import { ToastrService } from 'ngx-toastr';
import { CreateEditPanelComponent } from '../solar-panels/create-edit-panel/create-edit-panel.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './solar-panel.component.html',
  styleUrl: './solar-panel.component.scss',
})
export class SolarPanelComponent extends AppComponentBase implements OnInit {
  solarPanels: SolarPanelDto[] = [];
  loading = false;

  rows = 8;
  first = 0;
  filterText!: string;
  totalRecords: number = 0;
  inputData = new FilterInput();

  $unsubscribe = new Subject<void>();
  private readonly _primengTableHelper = new PrimengTableHelper();

  constructor(
    injector: Injector,
    private solarPanelService: SolarPanelService,
    private readonly _modalService: BsModalService,
    private toastr: ToastrService,
    private router: Router
  ) {
    super(injector);
  }
  ngOnInit(): void {}

  isPaginated(event?: TableLazyLoadEvent) {
    let res = event?.first != this.totalRecords && this.totalRecords != 0;
    return res;
  }

  lazyLoad(isFilter: boolean, event?: TableLazyLoadEvent) {
    if (
      this.isPaginated(event) &&
      !isFilter &&
      this._primengTableHelper.isSkipLoading(this.totalRecords)
    ) {
      return;
    }

    this.inputData.rows = event ? event.rows : this.rows;
    this.inputData.skip = event ? event.first : this.first;
    this.inputData.filterText = !this.filterText ? '' : this.filterText;
    this.inputData.sorting =
      this._primengTableHelper.getSortingFromLazyLoad(event);

    setTimeout(() => this.loadDataPanels(this.inputData));
  }

  loadDataPanels(input: FilterInput) {
    this.loading = true;
    this.solarPanelService
      .getAll(input)
      .pipe(
        takeUntil(this.$unsubscribe),
        finalize(() => (this.loading = false))
      )
      .subscribe((res) => {
        this.setDataStation(res);
      });
  }

  setDataStation(res: SolarPanelsResponse) {
    this.loading = false;
    this.solarPanels = res.solarPanels;

    this.totalRecords = res.total;
  }

  reloadPage(isFirstPage = false) {
    if (isFirstPage && this.first !== 0) {
      this.first = 0;
      return;
    }
    this.lazyLoad(false);
  }

  setComparedClass(value: string) {
    return value;
  }

  editOrAdd(panel?: SolarPanelDto) {
    let isEdit = false;
    if (!panel) {
      panel = new SolarPanelDisplayedDto();
    } else {
      isEdit = true;
    }
    const createOrEditModal = this._modalService.show(
      CreateEditPanelComponent,
      {
        class: 'modal-lg',
        initialState: {
          panel: panel,
          isEdit: isEdit,
        },
      }
    );
    createOrEditModal.content?.onSave.subscribe(() => {
      this.reloadPage();
    });
  }

  view(solarPanel?: SolarPanelDto) {
    const viewModal = this._modalService.show(ViewSolarPanelComponent, {
      class: 'modal-lg',
      initialState: {
        solarPanel: solarPanel,
      },
    });
  }

  calculation() {
    const ConfiguratorModal = this._modalService.show(ConfiguratorComponent, {
      class: 'modal-lg',
    });
  }

  tryDelete(panel: SolarPanelDto) {
    const messModal = this._modalService.show(ModalMessagesComponent, {
      class: 'modal-lg',
      initialState: {
        title: 'Delete Confirmation',
        messages: `Are you sure want to delete ${panel.width} * ${panel.length}'?`,
        isConfirmModal: true,
      },
    });

    messModal.content?.onConfirm.subscribe(() => {
      this.loading = true;
      this.solarPanelService
        .delete(panel.id)
        .pipe(
          takeUntil(this.$unsubscribe),
          finalize(() => (this.loading = false))
        )
        .subscribe((res) => {
          if (res.error) {
            this.toastr.error(res.error, 'Error');
            console.log(`Error -> ${res.error}`);
            return;
          } else {
            this.toastr.success('Panel was deleted', 'Success');
          }

          this.reloadPage();
        });
    });
  }
}
