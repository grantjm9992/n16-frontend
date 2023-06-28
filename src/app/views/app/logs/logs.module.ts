import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogsComponent } from './logs.component';
import {RouterModule, Routes} from "@angular/router";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {NgxJsonViewerModule} from "ngx-json-viewer";
import {NgSelectModule} from "@ng-select/ng-select";
import {FormsModule} from "@angular/forms";

const routes: Routes = [
  {
    path: '',
    component: LogsComponent,
  },
];

@NgModule({
  declarations: [
    LogsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxDatatableModule,
    NgxJsonViewerModule,
    NgSelectModule,
    FormsModule,
  ]
})
export class LogsModule { }
