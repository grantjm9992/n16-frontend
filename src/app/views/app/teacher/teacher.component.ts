import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import {ActivatedRoute, Router} from "@angular/router";
import {TeacherApiService} from "../../../core/services/teacher.api.service";

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {

  rows = [];
  filteredRows = [];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;

  constructor(
    private teacherApiService: TeacherApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.teacherApiService.getTeachers().subscribe((response) => {
      this.rows = response.data;
      this.filteredRows = response.data;
      this.loadingIndicator = false;
    });
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

  onRowClicked(event: any) {
    if (event.type === 'click') {
      const id = event.row.id;
      this.router.navigate([id], { relativeTo: this.activatedRoute });
    }
  }
}
