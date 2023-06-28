import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherComponent } from './teacher.component';
import {RouterModule, Routes} from "@angular/router";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ColorPickerModule} from "ngx-color-picker";
import {EditComponent} from "./edit/edit.component";
import {NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap";


const routes: Routes = [
  {
    path: '',
    component: TeacherComponent,
  },
  {
    path: ':id',
    component: EditComponent
  }
]

@NgModule({
  declarations: [
    TeacherComponent,
    EditComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    ColorPickerModule,
    NgbDatepickerModule,
  ]
})
export class TeacherModule { }
