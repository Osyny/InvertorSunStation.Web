import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { LoginDto } from '../../models/login.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}`; // 'https://your-api-url.com/api'; // Replace with your API URL
  private token: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    let dto = new LoginDto();
    dto.username = username;
    dto.password = password;

    let t = this.http.post(`${this.apiUrl}/Authentication/login`, dto);
    return t;
  }

  test(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Authentication/employees`);
  }

  setToken(token: any): void {
    this.token = token.accessToken.token;

    localStorage.setItem('access_token', token.accessToken.token);
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
    this.router.navigate(['/login']);
  }
  isAuthenticated(): boolean {
    debugger;
    let res = this.getToken() !== null;
    return res;
  }
}
