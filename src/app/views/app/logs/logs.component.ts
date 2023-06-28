import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import {EventApiService} from "../../../core/services/event.api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HistoryApiService} from "../../../core/services/history.api.service";
import {DatePipe} from "@angular/common";
import {UserApiService} from "../../../core/services/user.api.service";
import {CompanyApiService} from "../../../core/services/company.api.service";

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

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
  searchTerm: string = '';

  constructor(
    private historyService: HistoryApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public datePipe: DatePipe,
    private userApiService: UserApiService,
    private companyApiService: CompanyApiService
  ) { }

  makeDate(dateString: string) {
    return this.datePipe.transform(dateString, 'd/M/Y H:mm:ss');
  }

  pipeEntity(entity: any): string {
    return JSON.stringify(entity);
  }

  ngOnInit(): void {
    this.historyService.getAll().subscribe((response) => {
      this.rows = response.data;
      this.loadingIndicator = false;
    });
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
    if (this.searchTerm && this.searchTerm !== '') {
      string += `q=${this.searchTerm}&`;
    }

    return string;
  }

  filter(): void {
    this.loadingIndicator = true;
    console.log(this.selectedUser);
    let queryString = this.buildQueryString();
    this.historyService.getAll(queryString).subscribe(res => {
      this.rows = res.data;
      this.loadingIndicator = false;
    });
  }

}
