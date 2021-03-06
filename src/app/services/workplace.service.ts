import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import GlobalService from './globalService';
import { environment } from '../../environments/environment';
import { Workplace } from '../models/workplace';


@Injectable()
export class WorkplaceService extends GlobalService {

  url_workplaces = environment.url_base_api + environment.paths_api.workplaces;
  url_workplaces_export = environment.url_base_api + environment.paths_api.workplaces_export;

  constructor(public http: HttpClient) {
    super();
  }

  create(workplace: Workplace): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(
      this.url_workplaces,
      workplace,
      {headers: headers}
    );
  }

  get(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(
      this.url_workplaces + '/' + id,
      {headers: headers}
    );
  }

  list(limit = 100, offset = 0): Observable<any> {
    const headers = this.getHeaders();
    let params = new HttpParams();
    params = params.set('limit', limit.toString());
    params = params.set('offset', offset.toString());
    return this.http.get<any>(
      this.url_workplaces,
      {headers: headers, params: params}
    );
  }

  remove(workplace: Workplace): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(
      workplace.url,
      {headers: headers}
    );
  }

  update(url: string, workplace: Workplace): Observable<any> {
    const headers = this.getHeaders();
    return this.http.patch<any>(
      url,
      workplace,
      {headers: headers}
    );
  }

  export(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(
      this.url_workplaces_export,
      {
        headers: headers,
        responseType: 'blob' as 'json'
      });
  }
}
