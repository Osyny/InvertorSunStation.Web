import {
  Component,
  Injector,
  OnInit,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { AppComponentBase } from '../shared/app-component-base';

@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AuthComponent extends AppComponentBase implements OnInit {
  constructor(injector: Injector, private renderer: Renderer2) {
    super(injector);
  }

  ngOnInit(): void {}
}
