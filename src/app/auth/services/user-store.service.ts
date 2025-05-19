import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  private fullName$ = new BehaviorSubject<string>('');
  private role$ = new BehaviorSubject<string>('');

  constructor() {}

  public getRoleFromStore() {
    return this.role$.asObservable();
  }

  public setRoleForStore(role: string) {
    this.role$.next(role);
  }

  public getFullNameFromStore() {
    return this.fullName$.asObservable();
  }

  public setFullNameForStore(fullname: string) {
    this.fullName$.next(fullname);
  }

  // is User Auth
  private isUserAuthSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  // Expose an observable to components for subscribing to changes
  isUserAuth$: Observable<boolean> = this.isUserAuthSubject.asObservable();

  updateIsUserAuth(isUserAuth: boolean): void {
    this.isUserAuthSubject.next(isUserAuth);
  }
}
