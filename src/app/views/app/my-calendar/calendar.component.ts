import {Component, OnInit} from '@angular/core';
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import {EventApiService} from "../../../core/services/event.api.service";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {ViewEventModalComponent} from "./view-event-modal/view-event-modal.component";
import {UserService} from "../../../core/services/user.service";


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  simpleItems: any = [];
  selectedSimpleItem: any = null;
  calendarOptions: any = {
    editable: false,
    eventStartEditable: false,
    eventDurationEditable: false,
    startParam: 'start_date',
    endParam: 'end_date',
    titleParam: 'description',
    slotMinTime: '07:00:00',
    slotMaxTime: '23:00:00',
    allDaySlot: false,
    datesSet: this.getEventsForDate.bind(this),
    eventClick: this.clickEvent.bind(this),
    initialView: 'timeGridWeek',
    events: [],
    headerToolbar: {
      left: 'title',
      center: '',
      right: 'timeGridDay,timeGridWeek today prev,next',
    },
    plugins: [
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
      interactionPlugin,
      resourceTimeGridPlugin,
    ],
    schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives'
  };

  companies: any[] = [];
  activeUser: any;

  constructor(
    private eventApiService: EventApiService,
    private modalService: NgbModal,
    private userService: UserService
  ) { }

  public getEventsForDate(dateInfo: any) {
    let date = dateInfo.startStr.substring(0, 10);
    this.eventApiService.getEvents(date, '', '', 'true').subscribe(res => {
      this.calendarOptions.events = res.data;
    });
  }

  ngOnInit(): void {
    this.eventApiService.getEvents('', '', '', 'true').subscribe((res) => {
      this.calendarOptions.events = res.data;
    });
  }

  clickEvent(info: any): void {
    const modalRef: NgbModalRef = this.modalService.open(ViewEventModalComponent);
    modalRef.componentInstance.event = info.event;
  }

}
