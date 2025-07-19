import {
  Component,
  ElementRef,
  EventEmitter,
  Injector,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '../../../shared/app-component-base';
import { DisplayRoleUserDto } from '../dto/role-user-display.dto';
import { map as _map, forEach as _forEach, tail, times, uniq } from 'lodash';
import { NgForm } from '@angular/forms';

import { ValidationError } from '../../../shared/validation/validation.api';
import { UserDisplayedDto } from '../../../models/users/user-displayed.dto';
import { SelectItem } from '../../../models/select-item';
import { UserService } from '../../../services/user-service/user.service';
import { AuthService } from '../../../services/auth/auth.service';
import { UserDto } from '../../../models/users/user.dto';
import { ToastrService } from 'ngx-toastr';
import { RegisterUserDto } from '../../../models/auth/register-user.dto';
import { UserStoreService } from '../../../auth/services/user-store.service';

@Component({
  selector: 'app-create-edit-user',
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.scss',
})
export class CreateEditUserComponent
  extends AppComponentBase
  implements OnInit, OnDestroy
{
  @ViewChild('editUserForm', { read: ElementRef })
  editAssetFormRef!: ElementRef;
  loading = true;
  user: UserDisplayedDto = new UserDisplayedDto();
  isEdit: boolean = false;
  title?: string;
  test: string = 'TEST';
  roleUserDtos: DisplayRoleUserDto[] = [];
  roles: SelectItem[] = [];
  defaultRoleCheckedStatus = false;

  @Output() onSave = new EventEmitter<void>();
  @Output() onUpdate = new EventEmitter<void>();

  checkedRolesMap: { [key: string]: boolean } = {};

  isTextFieldType: boolean = false;
  isTextConfirmFieldType: boolean = false;
  isValidationError: boolean = false;
  confirmPassword: string = '';

  passwordValidationErrors: ValidationError[] = [
    {
      name: 'pattern',
      localizationKey:
        'Passwords Must Be At Least 8 harassers Contain Lower case Upper case Number',
      propertyKey: '',
    },
  ];
  confirmPasswordValidationErrors: ValidationError[] = [
    {
      name: 'validateEqual',
      localizationKey: 'Passwords DoNot Match',
      propertyKey: '',
    },
  ];

  private $unsubscribe = new Subject<void>();

  constructor(
    public bsModalRef: BsModalRef,
    injector: Injector,
    private userService: UserService,
    private authService: AuthService,
    private toastr: ToastrService,
    private userStoreService: UserStoreService
  ) {
    super(injector);
  }

  get getIconPathConfirmPass(): string {
    return this.isTextConfirmFieldType
      ? '/assets/img/sprite.svg#eye-open'
      : '/assets/img/sprite.svg#eye-close';
  }

  get getIconPathPassword(): string {
    return this.isTextFieldType
      ? '/assets/img/sprite.svg#eye-open'
      : '/assets/img/sprite.svg#eye-close';
  }
  ngOnInit(): void {
    if (!this.user?.id) {
      this.title = 'Create User';
    } else {
      this.title = 'Edit User';
    }
    this.loadRoles();
  }

  ngOnDestroy(): void {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }

  togglePasswordFieldType() {
    this.isTextFieldType = !this.isTextFieldType;
  }
  togglePasswordConfirmFieldType() {
    this.isTextConfirmFieldType = !this.isTextConfirmFieldType;
  }

  private loadRoles() {
    this.userService.getRoles().subscribe((result) => {
      this.roles = result;

      this.roleUserDtos = result as DisplayRoleUserDto[];
      this.roleUserDtos.forEach((r) => {
        r.normalizedName = r.name.toLowerCase();
        if (r.normalizedName === 'admin') {
          // r.isDisabled = true;
        }
      });
      this.setInitialRolesStatus();
      _map(this.roleUserDtos, (item) => {
        if (this.user?.roles.length) {
          let role = this.user?.roles[0];
          if (item.normalizedName === role.toLowerCase()) {
            this.checkedRolesMap[item.normalizedName] = true;
          }
        }
      });
    });
  }

  setInitialRolesStatus(): void {
    _map(this.roleUserDtos, (item) => {
      let isCheck = this.isRoleChecked(item.normalizedName);
      this.checkedRolesMap[item.normalizedName] = isCheck;
    });
  }

  isRoleChecked(normalizedName: string): boolean {
    // just return default role checked status
    // it's better to use a setting
    return this.defaultRoleCheckedStatus;
  }

  onRoleChange(role: DisplayRoleUserDto, $event: any) {
    this.checkedRolesMap[role.normalizedName] = $event.target.checked;
    _map(this.roleUserDtos, (item) => {
      if (item.name === role.name) {
        return;
      }

      this.checkedRolesMap[item.normalizedName] = this.isRoleChecked(
        item.normalizedName
      );
    });
  }

  getCheckedRoles(): string {
    const roles: string[] = [];
    _forEach(this.checkedRolesMap, function (value, key) {
      if (value) {
        roles.push(key);
      }
    });
    return roles[0];
  }

  save(ngForm: NgForm): void {
    if (ngForm.invalid) {
      // Object.keys(ngForm.form.controls).forEach((key) => {
      //   ngForm.form.controls[key].markAsTouched();
      // });
      ngForm.form.markAllAsTouched();
      return;
    }

    if (!this.getCheckedRoles()) {
      this.toastr.error('Check role!', 'Error');

      return;
    }

    if (!this.user.id) {
      let dto = this.user as RegisterUserDto;
      dto.roles = [this.getCheckedRoles()];
      this.userService.register(dto).subscribe((res) => {
        if (!res.isSuccess) {
          this.toastr.error(res.message, 'Error');

          return;
        } else {
          this.onSave.emit();
          this.cancel();
        }
      });
    } else {
      this.user.roles = [this.getCheckedRoles()];
      this.userService
        .update(this.user, this.user.id.toString())
        .subscribe((res) => {
          if (!res.isSuccess) {
            this.toastr.error(res.message, 'Error');
            return;
          } else {
            this.userStoreService.setFullNameForStore(this.user.userName);
            this.userStoreService.setRoleForStore(this.getCheckedRoles());
            this.userStoreService.setFullNameForStore;
            this.onUpdate.emit();
            this.cancel();
          }
        });
    }
  }

  cancel() {
    this.bsModalRef.hide();
  }

  get isErrorEquals(): boolean {
    return this.errorValidateEqual != '';
  }

  get errorValidateEqual(): string {
    let res = '';
    if (this.confirmPassword && this.user.password != this.confirmPassword) {
      res = 'Passwords do not match!';
    }
    return res;
  }
}
