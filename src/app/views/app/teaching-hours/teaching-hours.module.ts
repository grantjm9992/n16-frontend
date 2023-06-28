import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachingHoursComponent } from './teaching-hours.component';
import {RouterModule, Routes} from "@angular/router";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ColorPickerModule} from "ngx-color-picker";
import {NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap";
import {NgSelectModule} from "@ng-select/ng-select";


const routes: Routes = [
  {
    path: '',
    component: TeachingHoursComponent,
  },
]

@NgModule({
  declarations: [
    TeachingHoursComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    ColorPickerModule,
    NgbDatepickerModule,
    NgSelectModule,
  ]
})
export class TeachingHoursModule { }
