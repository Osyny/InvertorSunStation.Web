import {
  Component,
  Injector,
  OnInit,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { AppComponentBase } from '../shared/app-component-base';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AuthComponent extends AppComponentBase implements OnInit {
  isLoginPage: boolean = false;
  constructor(
    injector: Injector,
    private router: Router,
    private authService: AuthService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.authService.isLoginView$.subscribe((res) => {
      this.isLoginPage = res;
    });
  }
  clickLoginPage() {
    this.authService.updateIsLoginView(true);
  }

  back() {
    this.authService.updateIsLoginView(false);
    // this.router.navigateByUrl('auth');
  }
}
