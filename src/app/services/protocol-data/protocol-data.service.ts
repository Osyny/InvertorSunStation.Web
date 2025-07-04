import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { FilterInput } from '../../models/filter-input';
import { ProtocolDataOutput } from '../../models/protocol-datas/protocol-data.dto';

@Injectable({
  providedIn: 'root',
})
export class ProtocolDataService {
  private apiUrl = `${environment.apiUrl}`;
  constructor(private http: HttpClient) {}

  getAll(input: FilterInput): Observable<ProtocolDataOutput> {
    let params = new HttpParams();
    for (const [key, value] of Object.entries(input)) {
      console.log(`${key}: ${value}`);
      if (value) {
        params = params.append(key, value);
      }
    }
    let res = this.http.get<ProtocolDataOutput>(
      `${this.apiUrl}/ProtocolData/get-all`,
      {
        params,
      }
    );

    return res;
  }
}
