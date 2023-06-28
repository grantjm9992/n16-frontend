import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-view-event-modal',
  templateUrl: './view-event-modal.component.html',
  styleUrls: ['./view-event-modal.component.scss']
})
export class ViewEventModalComponent implements OnInit {

  @Input() event: any;
  constructor(public activeModal: NgbActiveModal, public datePipe: DatePipe) { }

  ngOnInit(): void {
  }

  public getTeacher(event: any): string {
    return event._def.extendedProps.teacher?.name + ' ' + event._def.extendedProps.teacher?.surname;
  }
}
