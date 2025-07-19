import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from '../../services/auth/auth.service';
import { ConfirmationService, Message } from 'primeng/api';
import { Router } from '@angular/router';
import { PrimengTableHelper } from '../../helpers/primeng-table-helper';
import { finalize, Subject, takeUntil } from 'rxjs';
import { AppComponentBase } from '../../shared/app-component-base';
import { UserDto } from '../../models/users/user.dto';
import { UserService } from '../../services/user-service/user.service';
import { TableLazyLoadEvent } from 'primeng/table';
import { UserInputData } from './dto/user-input';
import { UserDisplayedDto } from '../../models/users/user-displayed.dto';
import { CreateEditUserComponent } from './create-edit-user/create-edit-user.component';
import * as _ from 'lodash';
import { ModalMessagesComponent } from '../../shared/modal-messages/modal-messages.component';
import { DashboardPageService } from '../../shared/helpers/dashboard-page-service';
import { PageRedirectEnumForAdmin } from '../../shared/enums/page-redirect.enum';
import { ToastrService } from 'ngx-toastr';
import { UserStoreService } from '../../auth/services/user-store.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent
  extends AppComponentBase
  implements OnInit, AfterViewInit
{
  users: UserDto[] = [];
  rows = 10;
  first = 0;
  filterText!: string;
  totalRecords: number = 0;

  msgs: Message[] = [];
  position?: string;

  $unsubscribe = new Subject<void>();
  loading: boolean = false;

  private readonly _primengTableHelper = new PrimengTableHelper();

  constructor(
    injector: Injector,
    private readonly _modalService: BsModalService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private toastr: ToastrService,
    private userStoreService: UserStoreService
  ) {
    super(injector);
  }

  ngOnDestroy(): void {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }
  ngOnInit(): void {
    this.lazyLoadUser();
  }

  ngAfterViewInit(): void {
    let page = Number.parseInt(`${PageRedirectEnumForAdmin.users}`);
    DashboardPageService.getInstance().setData(page);
  }

  lazyLoadUser(event?: TableLazyLoadEvent) {
    if (this._primengTableHelper.isSkipLoading(this.totalRecords)) {
      return;
    }

    const input = new UserInputData();
    input.rows = event ? event.rows : this.rows;
    input.skip = event ? event.first : this.first;
    input.filterText = !this.filterText ? '' : this.filterText;
    input.sorting = this._primengTableHelper.getSortingFromLazyLoad(event);
    setTimeout(() => this.loadUsers(input));
  }

  loadUsers(input: UserInputData) {
    this.loading = true;

    this.userService
      .getAllUsers(input)
      .pipe(
        takeUntil(this.$unsubscribe),
        finalize(() => (this.loading = false))
      )
      .subscribe((res) => {
        this.users = res.users;
        this.totalRecords = res.total;
      });
  }

  editOrCreate(user?: UserDisplayedDto) {
    let isEdit = true;
    if (!user) {
      user = new UserDisplayedDto();
      isEdit = false;
    }
    const createOrEditModal = this._modalService.show(CreateEditUserComponent, {
      class: 'modal-lg',
      initialState: {
        user: _.cloneDeep(user),
        isEdit: isEdit,
      },
    });
    createOrEditModal.content?.onSave.subscribe(() => {
      this.toastr.success('Success create user!!!');
      this.reloadPage();
    });
    createOrEditModal.content?.onUpdate.subscribe(() => {
      this.toastr.success('Success update user!!!');
      this.reloadPage();
    });
  }

  reloadPage(isFirstPage = false) {
    if (isFirstPage && this.first !== 0) {
      this.first = 0;
      return;
    }

    this.lazyLoadUser();
  }

  updatePassword(user: UserDto) {}

  tryDeleteAsset(user: UserDto) {
    const messModal = this._modalService.show(ModalMessagesComponent, {
      class: 'modal-lg',
      initialState: {
        title: 'Delete Confirmation',
        messages: `Are you sure want to delete ${user.userName}'?`,
        isConfirmModal: true,
      },
    });

    messModal.content?.onConfirm.subscribe(() => {
      this.loading = true;
      this.userService
        .delete(user.id?.toString())
        .pipe(
          takeUntil(this.$unsubscribe),
          finalize(() => (this.loading = false))
        )
        .subscribe((res) => {
          this.toastr.success('User was deleted');

          this.reloadPage();
        });
    });
  }
}
