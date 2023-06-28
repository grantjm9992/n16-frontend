import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import {ActivatedRoute, Router} from "@angular/router";
import {UserApiService} from "../../../core/services/user.api.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  rows = [];
  filteredRows = [];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;

  constructor(
    private userApiService: UserApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userApiService.getUsers().subscribe((response) => {
      this.rows = response.data;
      this.filteredRows = response.data;
      this.loadingIndicator = false;
    });
  }

  onRowClicked(event: any) {
    if (event.type === 'click') {
      const id = event.row.id;
      this.router.navigate([id], { relativeTo: this.activatedRoute });
    }
  }

  filter(event: any) {
    let val = event.target.value.toLowerCase();
    this.rows = this.filteredRows.filter((item: any)  => {
      return this.getString(item).indexOf(val) !== -1;
    });
  }

  getString(item: any): string {
    let string = `${item.name.toString().toLowerCase()} `;
    if (item.surname) {
      string += `${item.surname.toString().toLowerCase()}`;
    }
    if (item.email) {
      string += `${item.email.toString().toLowerCase()}`;
    }

    return string;
  }
}
