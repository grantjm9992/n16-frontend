import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassroomComponent } from './classroom.component';
import {RouterModule, Routes} from "@angular/router";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import { EditComponent } from './edit/edit.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ColorPickerModule} from "ngx-color-picker";

const routes: Routes = [
  {
    path: '',
    component: ClassroomComponent,
  },
  {
    path: ':id',
    component: EditComponent
  }
]

@NgModule({
  declarations: [
    ClassroomComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    ColorPickerModule,
  ]
})
export class ClassroomModule { }
