import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../services/auth/auth.service';
import { UserDisplayedDto } from '../../../models/users/user-displayed.dto';
import { UserStoreService } from '../../../auth/services/user-store.service';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrl: './user-avatar.component.scss',
})
export class UserAvatarComponent implements OnInit {
  userName: string | undefined;
  role: string | undefined;
  loading: boolean = false;
  currentUser: UserDisplayedDto = new UserDisplayedDto();

  constructor(
    private authService: AuthService,
    private userStore: UserStoreService
  ) {}
  ngOnInit(): void {
    this.userStore.getFullNameFromStore().subscribe((val) => {
      const fullNameFromToken = this.authService.getFullNameFromToken();

      this.userName = val || fullNameFromToken;
    });

    this.userStore.getRoleFromStore().subscribe((val) => {
      const roleFromToken = this.authService.getRoleFromToken();
      this.role = val || roleFromToken;
    });
  }

  // backToMyAccount() {
  //   this.clickBackToMyAccount.emit(true);
  // }
}
