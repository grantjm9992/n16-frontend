import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService extends ApiService {

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.post('/login', body);
  }

  register(name: string, email: string, password: string): Observable<any> {
    const body = { name, email, password };
    return this.post('/register', body);
  }

  logout(): Observable<any> {
    return this.post('/logout');
  }
}
