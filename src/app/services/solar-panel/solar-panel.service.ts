import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

import {
  SolarPanelDto,
  SolarPanelsResponse,
} from '../../models/solar-panels/solar-panel.dto';
import { ConfiguratorResponse } from '../../models/solar-panels/configurator-response.dto';
import { FilterInput } from '../../models/filter-input';
import { OutputDataResponse } from '../output-data-response';
import { DataConfigurator } from '../../admin/solar-panels/dtos/data-configurator.dto';

@Injectable({
  providedIn: 'root',
})
export class SolarPanelService {
  private apiUrl = `${environment.apiUrl}`;
  constructor(private http: HttpClient) {}

  getAll(input: FilterInput): Observable<SolarPanelsResponse> {
    let params = new HttpParams();
    for (const [key, value] of Object.entries(input)) {
      console.log(`${key}: ${value}`);
      if (value) {
        params = params.append(key, value);
      }
    }
    let res = this.http.get<SolarPanelsResponse>(
      `${this.apiUrl}/api/SolarPanel/getAll`,
      {
        params,
      }
    );

    return res;
  }

  getById(Id?: string): Observable<SolarPanelDto> {
    var res = this.http.get<SolarPanelDto>(
      `${this.apiUrl}/api/SolarPanel/${Id}`
    );
    return res;
  }

  updateOrCreate(dto: SolarPanelDto): Observable<OutputDataResponse> {
    let response = this.http.post<OutputDataResponse>(
      `${this.apiUrl}/api/SolarPanel/update-create`,
      dto
    );

    return response;
  }

  delete(Id?: string): Observable<OutputDataResponse> {
    return this.http.delete<OutputDataResponse>(
      `${this.apiUrl}/api/SolarPanel/${Id}`
    );
  }

  configurator(input: DataConfigurator): Observable<ConfiguratorResponse> {
    let params = new HttpParams();
    for (const [key, value] of Object.entries(input)) {
      console.log(`${key}: ${value}`);
      if (value) {
        params = params.append(key, value);
      }
    }
    let response = this.http.get<ConfiguratorResponse>(
      `${this.apiUrl}/api/SolarPanel/configurator`,
      { params }
    );
    return response;
  }
}
