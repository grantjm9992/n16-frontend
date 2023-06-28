import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.baseApiUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, public router: Router) {}

  public formatErrors(error: any) {
    if (error.status === 401) {
      localStorage.setItem('isLoggedin', 'false');
      window.location.href = '/auth/login';
      return throwError(error.error);
    }
    if (error.error.error) {
      Swal.fire({
        title: 'Error',
        text: error.error.error,
        icon: 'error',
      });
    }
    return throwError(error.error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    if (localStorage.getItem('isLoggedin')) {
      let token = localStorage.getItem('token');
      this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${token}`);
    }
    const options = {
      ...this.httpOptions,
      params: params
    };
    return this.http.get(`${this.baseUrl}${path}`, options)
      .pipe(map((res: any) => res), catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    if (localStorage.getItem('isLoggedin')) {
      let token = localStorage.getItem('token');
      this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.put(`${this.baseUrl}${path}`, JSON.stringify(body), this.httpOptions)
      .pipe(map((res: any) => res), catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {
    if (localStorage.getItem('isLoggedin')) {
      let token = localStorage.getItem('token');
      this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.post(`${this.baseUrl}${path}`, JSON.stringify(body), this.httpOptions)
      .pipe(map((res: any) => res), catchError(this.formatErrors));
  }

  delete(path: string): Observable<any> {
    if (localStorage.getItem('isLoggedin')) {
      let token = localStorage.getItem('token');
      this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.delete(`${this.baseUrl}${path}`, this.httpOptions)
      .pipe(map((res: any) => res), catchError(this.formatErrors));
  }
}
