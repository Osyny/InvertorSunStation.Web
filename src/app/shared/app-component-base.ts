import { ElementRef, Injector } from '@angular/core';
//import { NotifyService }  from 'abp-ng2-module';

export abstract class AppComponentBase {
  elementRef: ElementRef;

  constructor(injector: Injector) {
    this.elementRef = injector.get(ElementRef);
  }
}
