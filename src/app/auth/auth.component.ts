import {
  Component,
  Inject,
  inject,
  Injector,
  OnInit,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { AppComponentBase } from '../shared/app-component-base';
import { Router } from '@angular/router';
import { AuthSubscribingChangesService } from './services/auth-subscribing-changes.service';
import { AuthService } from '../services/auth/auth.service';
import { DOCUMENT } from '@angular/common';

@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AuthComponent implements OnInit {
  isLoginPage: boolean = false;
  localStorage!: Storage | undefined;
  constructor(
    private authChangesService: AuthSubscribingChangesService,
    private authService: AuthService,
    @Inject(DOCUMENT) private document: Document
  ) {
    const localStorage = document.defaultView?.localStorage;
    this.localStorage = localStorage;
    if (this.localStorage) {
      this.authService.logout();
    }
  }

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
