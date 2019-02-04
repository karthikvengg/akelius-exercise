import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError} from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from './../../environments/environment';

import { Unit } from './../models/unit';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {
  }
  getList(): Observable<Unit> {
    const url = `${this.apiUrl}/units`;
    return this.http.get<any>(url)
      .pipe(
        tap(data => console.log('fetched List')),
        catchError(this.handleError('getList', []))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
