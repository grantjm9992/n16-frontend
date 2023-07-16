import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventLogsComponent } from './event-logs.component';
import {RouterModule, Routes} from "@angular/router";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {NgxJsonViewerModule} from "ngx-json-viewer";
import {NgSelectModule} from "@ng-select/ng-select";
import {FormsModule} from "@angular/forms";
import {NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap";

const routes: Routes = [
  {
    path: '',
    component: EventLogsComponent,
  },
];

@NgModule({
  declarations: [
    EventLogsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxDatatableModule,
    NgxJsonViewerModule,
    NgSelectModule,
    FormsModule,
    NgbDatepickerModule,
  ]
})
export class EventLogsModule { }
