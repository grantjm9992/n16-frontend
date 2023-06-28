import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import {FullCalendarModule} from "@fullcalendar/angular";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {ViewEventModalComponent} from "./view-event-modal/view-event-modal.component";

const routes: Routes = [
  {
    path: '',
    component: CalendarComponent
  }
]

@NgModule({
  declarations: [
    CalendarComponent,
    ViewEventModalComponent,
  ],
  imports: [
    CommonModule,
    FullCalendarModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
  ]
})
export class CalendarModule { }
