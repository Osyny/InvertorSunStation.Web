import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationSummaryComponent } from './validation/validation-summary.component';
import { AbpModalHeaderComponent } from './modal/abp-modal-header.component';
import { SpinerComponent } from '../layout/spiner/spiner.component';
import { ModalMessagesComponent } from './modal-messages/modal-messages.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ValidationSummaryComponent,
    AbpModalHeaderComponent,
    SpinerComponent,
    ModalMessagesComponent,
  ],
  exports: [
    ValidationSummaryComponent,
    AbpModalHeaderComponent,
    SpinerComponent,
  ],
  imports: [CommonModule, FormsModule],
})
export class SharedModule {}
