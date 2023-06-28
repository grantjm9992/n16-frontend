import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HolidayComponent } from './holiday.component';
import { EditComponent } from './edit/edit.component';
import {RouterModule, Routes} from "@angular/router";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {NgbDatepickerModule, NgbPopoverModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {TeacherGuard} from "../../../core/guard/teacher.guard";
import {FeatherIconModule} from "../../../core/feather-icon/feather-icon.module";


const routes: Routes = [
  {
    path: '',
    component: HolidayComponent,
  },
  {
    path: ':id',
    component: EditComponent,
  },
]

@NgModule({
  declarations: [
    HolidayComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbDatepickerModule,
    FeatherIconModule,
    NgbTooltipModule,
    NgbPopoverModule,
  ]
})
export class HolidayModule { }
