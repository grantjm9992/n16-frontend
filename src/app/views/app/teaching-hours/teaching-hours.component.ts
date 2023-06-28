import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import {TeachingHoursApiService} from "../../../core/services/teaching-hours.api.service";
import {UserService} from "../../../core/services/user.service";
import {CompanyApiService} from "../../../core/services/company.api.service";
import {NgbCalendar, NgbDate} from "@ng-bootstrap/ng-bootstrap";
import {EventTypeApiService} from "../../../core/services/event-type.api.service";
import {DepartmentApiService} from "../../../core/services/department.api.service";

@Component({
  selector: 'app-teaching-hours',
  templateUrl: './teaching-hours.component.html',
  styleUrls: ['./teaching-hours.component.scss']
})
export class TeachingHoursComponent implements OnInit {

  maxDate: any = null;
  rows = [];
  filteredRows = [];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  activeUser: any;
  simpleItems: any[];
  selectedSimpleItem: any = '';
  groupByItems = [{
    id: 'teacher_and_event_type',
    name: 'Teacher and event type'
  }, {
    id: 'teacher_and_department',
    name: 'Teacher and department'
  }, {
    id: 'teacher',
    name: 'Teacher'
  }, {
    id: 'department',
    name: 'Department'
  }];
  groupByItem: any = 'teacher';
  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate;
  toDate: NgbDate | null = null;
  eventTypes: any[] = [];
  eventType: any;
  departments: any[] = [];
  department: any;
  filterString: any = '';

  constructor(
    private eventTypeApiService: EventTypeApiService,
    private teacherApiService: TeachingHoursApiService,
    private userService: UserService,
    private companyApiService: CompanyApiService,
    private departmentApiService: DepartmentApiService,
    calendar: NgbCalendar
  ) {
    this.toDate = calendar.getToday();
    this.fromDate = calendar.getNext(calendar.getToday(), 'd', -6);
  }

  onDateSelection(date: NgbDate) {
    this.maxDate = null;
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      this.setMaxDate();
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
      this.setMaxDate();
    }
  }

  setMaxDate(): void {
    let date_ = new Date(this.fromDate.year, this.fromDate.month, this.fromDate.day);
    date_.setDate(date_.getDate() + 31);
    this.maxDate = new NgbDate(date_.getFullYear(), date_.getMonth(), date_.getDate());
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  ngOnInit(): void {
    this.activeUser = this.userService.getUser();
    this.companyApiService.getCompanies().subscribe(res => {
      this.simpleItems = res.data;
    });
    this.eventTypeApiService.getAll().subscribe(res => {
      this.eventTypes = res.data;
    });
    this.departmentApiService.getAll().subscribe(res => {
      this.departments = res.data;
    });
  }

  filter(event: any) {
    this.filterString = event.target.value.toLowerCase();
    this.filterRows();
  }

  filterRows() {
    this.rows = this.filteredRows.filter((item: any)  => {
      let _eventType = true;
      if (this.eventType) {
        _eventType = this.eventType === item.event_type;
      }
      let _department = true;
      if (this.department) {
        _department = this.department === item.department;
      }
      let _string = this.getString(item).indexOf(this.filterString) !== -1;
      return _string && _eventType && _department;
    });
  }

  getString(item: any): string {
    let string = `${item.name.toString().toLowerCase()} `;
    if (item.surname) {
      string += `${item.surname.toString().toLowerCase()}`;
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

  filterResources() {
    if (this.groupByItem === 'teacher_and_event_type') {
      this.eventType = null;
    }
    this.loadingIndicator = true;
    let start_date = this.getDateString(this.fromDate);
    let end_date = this.getDateString(this.toDate);
    this.teacherApiService.getAll(`start_date=${start_date}&end_date=${end_date}&group_by=${this.groupByItem}&company_id=${this.selectedSimpleItem}`).subscribe((response) => {
      this.rows = response;
      this.filteredRows = response;
      this.loadingIndicator = false;
    });
  }
}
