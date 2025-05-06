import {
  Component,
  EventEmitter,
  Injector,
  Output,
  Input,
} from '@angular/core';
import { AppComponentBase } from '../app-component-base';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal-messages',
  templateUrl: './modal-messages.component.html',
  styleUrl: './modal-messages.component.scss',
  standalone: false,
})
export class ModalMessagesComponent extends AppComponentBase {
  title: string = '';
  @Input() messages: string = '';

  @Output() onConfirm = new EventEmitter<void>();
  @Input() isConfirmModal: boolean = false;

  constructor(public bsModalRef: BsModalRef, injector: Injector) {
    super(injector);
  }

  cancel() {
    this.bsModalRef.hide();
  }

  send(ngForm: NgForm) {
    this.onConfirm.emit();
    this.cancel();
  }
}
