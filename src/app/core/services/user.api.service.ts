import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserApiService extends ApiService {

  getUsers(): Observable<any> {
    return this.get('/users');
  }

  getUser(id: string):  Observable<any> {
    return this.get(`/users/${id}`);
  }

  updateUser(id: string, user: any) {
    return this.post(`/users/${id}`, user);
  }

  updateUserPassword(id: string, password: string) {
    return this.post(`/users/${id}/update-password`, {password: password});
  }

  createUser(user: any) {
    return this.post(`/users`, user);
  }
}
