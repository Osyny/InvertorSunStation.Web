import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UserDto, UsersResponse } from '../../models/users/user.dto';
import { environment } from '../../../environments/environment.development';
import { OutputDataResponse } from '../output-data-response';
import { UsersRolesResponse } from './user-role.dto';
import { UserInputData } from '../../admin/users/dto/user-input';
import { SelectItem } from '../../models/select-item';
import { RegisterUserDto } from '../../models/auth/register-user.dto';
import { ResponseOutput } from '../../models/response.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiUrl}`;
  constructor(private http: HttpClient) {}
  getAllUsers(input: UserInputData): Observable<UsersResponse> {
    let params = new HttpParams();
    for (const [key, value] of Object.entries(input)) {
      console.log(`${key}: ${value}`);
      if (value) {
        params = params.append(key, value);
      }
    }

    let res = this.http.get<UsersResponse>(`${this.apiUrl}/User/getAllUsers`, {
      params,
    });

    return res;
  }

  updateUser() {}

  getRoles(): Observable<SelectItem[]> {
    var res = this.http.get<SelectItem[]>(`${this.apiUrl}/User/getRoles`);
    return res;
  }

  register(dto: RegisterUserDto): Observable<ResponseOutput> {
    return this.http.post<ResponseOutput>(
      `${this.apiUrl}/Authentication/register`,
      dto
    );
  }

  update(data: UserDto, id?: string): Observable<ResponseOutput> {
    let response = this.http.put<ResponseOutput>(
      `${this.apiUrl}/User/${id}/update`,
      data
    );

    return response;
  }

  delete(userId?: string): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/User/${userId}`);
  }
}
