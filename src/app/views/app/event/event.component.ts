import { Component, OnInit } from '@angular/core';
import {CompanyApiService} from "../../../core/services/company.api.service";
import {EventApiService} from "../../../core/services/event.api.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  public error: any[] = [];
  public companies: any[] = [];
  public company_id = null;
  public date = '';

  constructor(
      private companyApiService: CompanyApiService,
      private eventApiService: EventApiService,
      private router: Router
  ) { }

  ngOnInit(): void {
    this.companyApiService.getCompanies().subscribe(res => {
      this.companies = res.data;
    });
  }

  onSubmit(): void {
    if (this.company_id && this.date) {
      this.eventApiService.suspendForDay(this.company_id, this.date).subscribe(res => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: `Classes have been suspended on ${this.date}`
        });
      }, error => {
        this.error.push(error.message);
      });
    }
  }

  dateChange(dateObject: any): void {
    this.date = this.getDateString(dateObject);
  }

  private getDateString(dateObject: any): string {
    return `${dateObject.year}-${this.pad(dateObject.month)}-${this.pad(dateObject.day)}`;
  }

  private pad(num:number, size: number = 2): string {
    let s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }
}
