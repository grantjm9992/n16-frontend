import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventTypeComponent } from './event-type.component';
import { EditComponent } from './edit/edit.component';
import {RouterModule, Routes} from "@angular/router";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";

const routes: Routes = [
  {
    path: '',
    component: EventTypeComponent,
  },
  {
    path: ':id',
    component: EditComponent,
  },
];

@NgModule({
  declarations: [
    EventTypeComponent,
    EditComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
  ]
})
export class EventTypeModule { }
