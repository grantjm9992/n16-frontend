import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {DatePipe} from "@angular/common";
import {ClassroomApiService} from "../../../../core/services/classroom.api.service";

@Component({
  selector: 'app-view-event-modal',
  templateUrl: './view-event-modal.component.html',
  styleUrls: ['./view-event-modal.component.scss']
})
export class ViewEventModalComponent implements OnInit {

  @Input() event: any;

  public classroom: any = '';
  constructor(public activeModal: NgbActiveModal, public datePipe: DatePipe,
  private classroomApiService: ClassroomApiService) { }

  ngOnInit(): void {
    this.classroomApiService.getClassroom(this.event._def.extendedProps.classroom_id).subscribe(res => {
      this.classroom = res.data.name;
    });
  }

  public getTeacher(event: any): string {
    return event._def.extendedProps.teacher?.name + ' ' + event._def.extendedProps.teacher?.surname;
  }

  public getClassroom(event: any): string {
    return event._def.extendedProps.classroom?.name;
  }
}
