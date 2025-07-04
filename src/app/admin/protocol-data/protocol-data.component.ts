import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '../../shared/app-component-base';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { PrimengTableHelper } from '../../helpers/primeng-table-helper';
import { finalize, Subject, takeUntil } from 'rxjs';
import { ProtocolDataDto } from '../../models/protocol-datas/protocol-data.dto';
import { TableLazyLoadEvent } from 'primeng/table';
import { FilterInput } from '../../models/filter-input';
import { ProtocolDataService } from '../../services/protocol-data/protocol-data.service';

@Component({
  selector: 'app-protocol-data',
  templateUrl: './protocol-data.component.html',
  styleUrl: './protocol-data.component.scss',
})
export class ProtocolDataComponent extends AppComponentBase implements OnInit {
  protocolData: ProtocolDataDto[] = [];
  loading: boolean = false;
  rows = 8;
  first = 0;
  totalRecords: number = 0;
  inputData = new FilterInput();
  filterText!: string;

  $unsubscribe = new Subject<void>();
  private readonly _primengTableHelper = new PrimengTableHelper();

  constructor(
    injector: Injector,
    private protocolDataService: ProtocolDataService,
    private readonly _modalService: BsModalService,
    private toastr: ToastrService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    // this.lazyLoad(true);
  }

  ngOnDestroy(): void {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }

  isPaginated(event?: TableLazyLoadEvent) {
    let res = event?.first != this.totalRecords && this.totalRecords != 0;
    return res;
  }

  lazyLoad(isFilter: boolean, event?: TableLazyLoadEvent) {
    debugger;
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
    this.protocolDataService
      .getAll(input)
      .pipe(
        takeUntil(this.$unsubscribe),
        finalize(() => (this.loading = false))
      )
      .subscribe((res) => {
        debugger;
        this.protocolData = res.protocolData;
        this.totalRecords = res.total;
      });
  }

  editOrAdd(panel?: any) {
    let isEdit = false;
    // if (!panel) {
    //   panel = new SolarPanelDisplayedDto();
    // } else {
    //   isEdit = true;
    // }
    // const createOrEditModal = this._modalService.show(
    //   CreateEditPanelComponent,
    //   {
    //     class: 'modal-lg',
    //     initialState: {
    //       panel: panel,
    //       isEdit: isEdit,
    //     },
    //   }
    // );
    // createOrEditModal.content?.onSave.subscribe(() => {
    //   this.reloadPage();
    // });
  }

  view(solarPanel?: any) {
    // const viewModal = this._modalService.show(ViewSolarPanelComponent, {
    //   class: 'modal-lg',
    //   initialState: {
    //     solarPanel: solarPanel,
    //   },
    // });
  }

  tryDelete(panel: any) {
    // const messModal = this._modalService.show(ModalMessagesComponent, {
    //   class: 'modal-lg',
    //   initialState: {
    //     title: 'Delete Confirmation',
    //     messages: `Are you sure want to delete ${panel.width} * ${panel.length}'?`,
    //     isConfirmModal: true,
    //   },
    // });
    // messModal.content?.onConfirm.subscribe(() => {
    //   this.loading = true;
    //   // this.solarPanelService
    //   //   .delete(panel.id)
    //   //   .pipe(
    //   //     takeUntil(this.$unsubscribe),
    //   //     finalize(() => (this.loading = false))
    //   //   )
    //   //   .subscribe((res) => {
    //   //     if (res.error) {
    //   //       this.toastr.error(res.error, 'Error');
    //   //       console.log(`Error -> ${res.error}`);
    //   //       return;
    //   //     } else {
    //   //       this.toastr.success('Panel was deleted', 'Success');
    //   //     }
    //   //     this.reloadPage();
    //   //   });
    // });
  }
}
