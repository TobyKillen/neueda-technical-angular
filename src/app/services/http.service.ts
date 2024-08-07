import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    throw error;
  }

  $get<T>(url: string, params?: any, headers?: HttpHeaders): Observable<T> {
    let httpParams = new HttpParams();
    if (params) {
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          httpParams = httpParams.append(key, params[key]);
        }
      }
    }
    return this.httpClient.get<T>(url, { params: httpParams, headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  
}
