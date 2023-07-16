import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {EventComponent} from "./event.component";
import { EditComponent } from './edit/edit.component';
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {NgbDatepickerModule, NgbTimepickerModule} from "@ng-bootstrap/ng-bootstrap";
import { ModifyGroupEventComponent } from './modify-group-event/modify-group-event.component';
import {SuperAdminGuard} from "../../../core/guard/super-admin.guard";

const routes: Routes = [
  {
    path: '',
    component: EventComponent,
    canActivate: [SuperAdminGuard]
  },
  {
    path: ':id',
    component: EditComponent,
  },
]

@NgModule({
  providers: [DatePipe],
  declarations: [
    EventComponent,
    EditComponent,
    ModifyGroupEventComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
  ]
})
export class EventModule { }
