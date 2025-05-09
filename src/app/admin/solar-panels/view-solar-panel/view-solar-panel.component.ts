import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { AppComponentBase } from '../../../shared/app-component-base';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { SolarPanelDisplayedDto } from '../dtos/solar-panel-displayed.dto';

@Component({
  selector: 'app-view-solar-panel',
  templateUrl: './view-solar-panel.component.html',
  styleUrl: './view-solar-panel.component.scss',
})
export class ViewSolarPanelComponent
  extends AppComponentBase
  implements OnInit, OnDestroy
{
  solarPanel: SolarPanelDisplayedDto = new SolarPanelDisplayedDto();
  title: string = 'View';
  private $unsubscribe = new Subject<void>();
  constructor(public bsModalRef: BsModalRef, injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }
}
