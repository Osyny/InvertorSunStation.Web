import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth/auth.service';
import { UserStoreService } from './auth/services/user-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  isAuthorized?: boolean = false;
  userName: string | undefined;
  role: string | undefined;

  constructor(
    private authService: AuthService,
    private userStore: UserStoreService
  ) {}
  title = 'Web';

  ngOnInit(): void {
    this.userStore.isUserAuth$.subscribe((res) => {
      this.isAuthorized = res;
    });
  }
}
