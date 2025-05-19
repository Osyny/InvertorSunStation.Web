import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { LoginDto } from '../../models/auth/login.dto';
import { RegisterUserDto } from '../../models/auth/register-user.dto';
import { ResponseOutput } from '../../models/response.dto';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DOCUMENT } from '@angular/common';
import { UserStoreService } from '../../auth/services/user-store.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}`; // 'https://your-api-url.com/api'; // Replace with your API URL
  private token: string | null = null;
  private userPayload: any;
  localStorage!: Storage | undefined;
  isAuth: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private http: HttpClient,
    private router: Router,
    private userStoreService: UserStoreService
  ) {
    const localStorage = document.defaultView?.localStorage;
    this.localStorage = localStorage;

    if (this.localStorage) {
      this.userPayload = this.decodedToken();
      if (this.userPayload) {
        this.userStoreService.updateIsUserAuth(true);
      }
    }
  }

  login(username: string, password: string): Observable<any> {
    let dto = new LoginDto();
    dto.username = username;
    dto.password = password;
    return this.http.post<any>(`${this.apiUrl}/Authentication/login`, dto);
  }

  register(dto: RegisterUserDto): Observable<ResponseOutput> {
    return this.http.post<ResponseOutput>(
      `${this.apiUrl}/Authentication/register`,
      dto
    );
  }

  test(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Authentication/employees`);
  }

  setToken(token: any): void {
    this.token = token.accessToken.token;

    localStorage.setItem('access_token', token.accessToken.token);

    this.userStoreService.updateIsUserAuth(true);
  }
  getToken(): string | null {
    let storage: string | null = null;
    if (typeof localStorage !== 'undefined') {
      storage = localStorage.getItem('access_token');
    }
    return this.token || storage;
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('access_token');
    this.userStoreService.updateIsUserAuth(false);
    this.router.navigateByUrl('/auth');
  }
  isAuthenticated(): boolean {
    let res = this.getToken() !== null;
    return res;
  }

  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token));
    return jwtHelper.decodeToken(token);
  }

  getFullNameFromToken() {
    if (this.userPayload) {
      let res =
        this.userPayload[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
        ];
      return res;
    }
  }

  getRoleFromToken() {
    if (this.userPayload) {
      return this.userPayload[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ];
    }
  }
}
