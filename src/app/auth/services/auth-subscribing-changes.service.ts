import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthSubscribingChangesService {
  constructor() {}
  private isLoginViewSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);

  // Expose an observable to components for subscribing to changes
  isLoginView$: Observable<boolean> = this.isLoginViewSubject.asObservable();

  updateIsLoginView(isLoginView: boolean): void {
    this.isLoginViewSubject.next(isLoginView);
  }
}
