import { Component, OnInit } from '@angular/core';
import {HistoryApiService} from "../../../core/services/history.api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {UserApiService} from "../../../core/services/user.api.service";
import {CompanyApiService} from "../../../core/services/company.api.service";
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-event-logs',
  templateUrl: './event-logs.component.html',
  styleUrls: ['./event-logs.component.scss']
})
export class EventLogsComponent implements OnInit {

  rows = [];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  companies: any[] = [];
  users: any[] = [];
  selectedCompany: null|string = null;
  selectedUser: null|string = null;
  dateStart: string = '';
  dateEnd: string = '';
  teacherSearch: string = '';
  userSearch: string = '';
  nameSearch: string = '';
  dateSearch: any;

  constructor(
      private historyService: HistoryApiService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      public datePipe: DatePipe,
      private userApiService: UserApiService,
      private companyApiService: CompanyApiService
  ) { }

  ngOnInit(): void {
    this.filter();
    this.userApiService.getUsers().subscribe(res => {
      this.users = res.data;
    });
    this.companyApiService.getCompanies().subscribe(res => {
      this.companies = res.data;
    });
  }

  private buildQueryString(): string {
    let string = '&';
    if (this.selectedUser) {
      string += `user_id=${this.selectedUser}&`;
    }
    if (this.userSearch && this.userSearch !== '') {
      string += `user=${this.userSearch}&`;
    }
    if (this.nameSearch && this.nameSearch !== '') {
      string += `name=${this.nameSearch}&`;
    }
    if (this.teacherSearch && this.teacherSearch !== '') {
      string += `teacher=${this.teacherSearch}&`;
    }
    if (this.dateSearch && this.dateSearch !== '') {
      let date = this.dateSearch;
      if (typeof this.dateSearch !== 'string') {
        date = this.getDateString(this.dateSearch);
      }
      string += `date=${date}&`;
    }

    return string;
  }

  private getDateString(dateObject: any): string {
    return `${dateObject.year}-${this.pad(dateObject.month)}-${this.pad(dateObject.day)}`;
  }

  private pad(num:number, size: number = 2): string {
    let s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }

  filter(): void {
    this.loadingIndicator = true;
    let queryString = this.buildQueryString();
    this.historyService.getEventLogs(queryString).subscribe(res => {
      this.rows = res.data;
      this.loadingIndicator = false;
    });
  }

}
