import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import {AbstractApiService} from "./abstract.api.service";

@Injectable({
  providedIn: 'root'
})
export class HistoryApiService extends AbstractApiService {
  getUrl(): string {
    return "/history-log";
  }

  getEventLogs(query_string: string = ''): Observable<any> {
    return this.get(`${this.getUrl()}/event?${query_string}`);
  }
}
