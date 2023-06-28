import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import {ActivatedRoute, Router} from "@angular/router";
import {HolidayApiService} from "../../../core/services/holiday.api.service";
import {CompanyApiService} from "../../../core/services/company.api.service";
import {UserService} from "../../../core/services/user.service";

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.scss']
})
export class HolidayComponent implements OnInit {

  rows = [];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  user: any;

  constructor(
    private holidayApiService: HolidayApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private companyApiService: CompanyApiService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.loadData();
  }

  loadData(): void {
    this.loadingIndicator = true;
    this.holidayApiService.getAll().subscribe((response) => {
      this.rows = response.data;
      this.loadingIndicator = false;
    });
  }

  onSelect(row: any): void {
    console.log(row);
  }

  accept(id: string) {
    this.holidayApiService.accept(id).subscribe((res: any) => {
      this.loadData();
    });
  }

  reject(id: string) {
    this.holidayApiService.reject(id).subscribe((res: any) => {
      this.loadData();
    });
  }

  revoke(id: string) {
    this.holidayApiService.revoke(id).subscribe((res: any) => {
      this.loadData();
    });
  }

  onRowClicked(id: string) {
    this.router.navigate([id], { relativeTo: this.activatedRoute });
  }
}