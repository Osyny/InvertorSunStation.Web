import {
  Component,
  ElementRef,
  EventEmitter,
  Injector,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '../../../shared/app-component-base';

import { map as _map, forEach as _forEach, tail, times, uniq } from 'lodash';
import { NgForm } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { SolarPanelDisplayedDto } from '../dtos/solar-panel-displayed.dto';
import { SolarPanelDto } from '../../../models/solar-panels/solar-panel.dto';
import { SolarPanelService } from '../../../services/solar-panel/solar-panel.service';

@Component({
  selector: 'app-create-edit-panel',
  standalone: false,
  templateUrl: './create-edit-panel.component.html',
  styleUrl: './create-edit-panel.component.scss',
})
export class CreateEditPanelComponent
  extends AppComponentBase
  implements OnInit, OnDestroy
{
  loading = true;
  panel: SolarPanelDisplayedDto = new SolarPanelDisplayedDto();
  isEdit: boolean = false;
  title?: string;

  @Output() onSave = new EventEmitter<void>();

  checkedRolesMap: { [key: string]: boolean } = {};

  isTextFieldType: boolean = false;
  isTextConfirmFieldType: boolean = false;
  isValidationError: boolean = false;
  confirmPassword: string = '';

  private $unsubscribe = new Subject<void>();

  constructor(
    public bsModalRef: BsModalRef,
    injector: Injector,
    private solarPanelService: SolarPanelService,
    private toastr: ToastrService
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
    if (!this.panel?.id) {
      this.title = 'Create ';
    } else {
      this.title = 'Edit ';
    }
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

  save(ngForm: NgForm): void {
    if (ngForm.invalid) {
      ngForm.form.markAllAsTouched();
      return;
    }

    let dto = this.panel as SolarPanelDto;

    this.solarPanelService.updateOrCreate(dto).subscribe((res) => {
      if (res.error) {
        this.toastr.error(res.error, 'Error');
        console.log(`Error -> ${res.error}`);
        return;
      } else {
        let message = this.isEdit ? 'Success update' : 'Success added';
        this.toastr.success(message, 'Success');
        this.onSave.emit();
        this.cancel();
      }
    });
  }

  cancel() {
    this.bsModalRef.hide();
  }
}
