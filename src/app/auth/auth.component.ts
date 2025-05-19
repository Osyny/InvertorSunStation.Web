import {
  Component,
  Injector,
  OnInit,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { AppComponentBase } from '../shared/app-component-base';
import { Router } from '@angular/router';
import { AuthSubscribingChangesService } from './services/auth-subscribing-changes.service';

@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AuthComponent implements OnInit {
  isLoginPage: boolean = false;
  constructor(private authChangesService: AuthSubscribingChangesService) {}

  ngOnInit(): void {
    this.authChangesService.isLoginView$.subscribe((res) => {
      this.isLoginPage = res;
    });
  }
  clickLoginPage() {
    this.authChangesService.updateIsLoginView(true);
  }

  back() {
    this.authChangesService.updateIsLoginView(false);
    // this.router.navigateByUrl('auth');
  }
}
