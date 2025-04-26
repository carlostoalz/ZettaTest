import {
  HttpClient,
  HttpContext,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlApis } from '../enums/api.url';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {
    this.options = {
      observe: 'response',
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  private options: {
    headers?:
      | HttpHeaders
      | {
          [header: string]: string | string[];
        };
    observe: 'response';
    context?: HttpContext;
    params?:
      | HttpParams
      | {
          [param: string]:
            | string
            | number
            | boolean
            | ReadonlyArray<string | number | boolean>;
        };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  } = null;

  getAll<Entity>(
    baseUrl: string,
    urlApi: UrlApis | string
  ): Observable<HttpResponse<Entity>> {
    return this.httpClient.get<Entity>(
      `${baseUrl}${urlApi}`,
      this.getOptions()
    );
  }

  post<Entity>(
    body: any,
    baseUrl: string,
    urlApi: UrlApis | string
  ): Observable<HttpResponse<Entity>> {
    return this.httpClient.post<Entity>(
      `${baseUrl}${urlApi}`,
      body,
      this.getOptions()
    );
  }

  put<Entity>(
    body: any,
    baseUrl: string,
    urlApi: UrlApis | string
  ): Observable<HttpResponse<Entity>> {
    return this.httpClient.put<Entity>(
      `${baseUrl}${urlApi}`,
      body,
      this.getOptions()
    );
  }

  delete<Entity>(
    id: number,
    baseUrl: string,
    urlApi: UrlApis | string
  ): Observable<HttpResponse<Entity>> {
    return this.httpClient.delete<Entity>(
      `${baseUrl}${urlApi}/${id}`,
      this.getOptions()
    );
  }

  private getOptions(): {
    headers?:
      | HttpHeaders
      | {
          [header: string]: string | string[];
        };
    observe: 'response';
    context?: HttpContext;
    params?:
      | HttpParams
      | {
          [param: string]:
            | string
            | number
            | boolean
            | ReadonlyArray<string | number | boolean>;
        };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  } {
    let headers:
      | HttpHeaders
      | {
          [header: string]: string | string[];
        } = {
      'Content-Type': 'application/json',
    };
    this.options.headers = headers;
    return this.options;
  }
}
