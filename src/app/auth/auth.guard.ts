import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

export namespace AuthGuard {
  export const canActivate = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    if (inject(AuthService).isAuthenticated()) {
      return true;
    } else {
      inject(Router).navigate(['/auth']);
      return false;
    }
  };

  export const canActivateChild = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => canActivate(route, state);
}
