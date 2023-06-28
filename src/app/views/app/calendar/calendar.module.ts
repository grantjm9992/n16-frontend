import { NgModule } from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {CommonModule, DatePipe} from '@angular/common';
import { CalendarComponent } from './calendar.component';
import {FullCalendarModule} from "@fullcalendar/angular";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {ArchwizardModule} from "angular-archwizard";
import { EditEventModalComponent } from './edit-event-modal/edit-event-modal.component';
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";
import { ViewEventModalComponent } from './view-event-modal/view-event-modal.component';
import {NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap";

const routes: Routes = [
  {
    path: '',
    component: CalendarComponent
  }
]

@NgModule({
  providers: [DatePipe],
  declarations: [
    CalendarComponent,
    EditEventModalComponent,
    ViewEventModalComponent
  ],
  imports: [
    CommonModule,
    FullCalendarModule,
    RouterModule.forChild(routes),
    FormsModule,
    DragDropModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbDatepickerModule,
    ArchwizardModule,
    SweetAlert2Module.forRoot(),
  ]
})
export class CalendarModule { }
