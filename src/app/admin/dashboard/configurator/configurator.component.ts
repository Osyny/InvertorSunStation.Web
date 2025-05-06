import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { AppComponentBase } from '../../../shared/app-component-base';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { NgForm } from '@angular/forms';
import { SolarPanelService } from '../../../services/solar-panel/solar-panel.service';
import { DataConfigurator } from '../dtos/data-configurator.dto';
import { SolarPanelDto } from '../../../models/solar-panels/solar-panel.dto';
import { ConfiguratorResponse } from '../../../models/solar-panels/configurator-response.dto';

@Component({
  selector: 'app-configurator',
  templateUrl: './configurator.component.html',
  styleUrl: './configurator.component.scss',
})
export class ConfiguratorComponent
  extends AppComponentBase
  implements OnInit, OnDestroy
{
  title: string = 'Configurator';

  result: ConfiguratorResponse | undefined;
  input: DataConfigurator = new DataConfigurator();

  private $unsubscribe = new Subject<void>();

  constructor(
    public bsModalRef: BsModalRef,
    injector: Injector,
    private solarPanelService: SolarPanelService
  ) {
    super(injector);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }

  configurator(ngForm: NgForm) {
    if (ngForm.invalid) {
      ngForm.form.markAllAsTouched();
      return;
    }
    if (this.input)
      this.solarPanelService.configurator(this.input).subscribe((res) => {
        this.result = res;
      });
  }

  cancel() {
    this.bsModalRef.hide();
  }
}
