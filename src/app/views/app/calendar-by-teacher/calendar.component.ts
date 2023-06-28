import {Component, OnInit, ViewChild} from '@angular/core';
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import scrollGridPlugin from "@fullcalendar/scrollgrid";
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import {ClassroomApiService} from "../../../core/services/classroom.api.service";
import {EventApiService} from "../../../core/services/event.api.service";
import {CompanyApiService} from "../../../core/services/company.api.service";
import {TeacherApiService} from "../../../core/services/teacher.api.service";
import {UserService} from "../../../core/services/user.service";
import {FullCalendarComponent} from "@fullcalendar/angular";


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  groupedEvents: any[] = [];
  updateThisAndFutureClasses: boolean = false;
  activeUser: any;
  resources: any[] = [];
  simpleItems: any = [];
  selectedSimpleItem: any;
  allowScroll: boolean = false;
  calendarOptions: any = {
    editable: false,
    eventStartEditable: false,
    eventDurationEditable: false,
    resourceOrder: 'title',
    eventDrop: this.updateEvent.bind(this),
    resourceEditable: true,
    startParam: 'start_date',
    endParam: 'end_date',
    titleParam: 'description',
    slotMinTime: '07:00:00',
    slotMaxTime: '23:00:00',
    snapDuration: '00:05:00',
    titleFormat: {
      month: 'long',
      year: 'numeric',
      day: 'numeric',
      weekday: 'long'
    },
    eventMinHeight: 5,
    height: '830px',
    contentHeight: '830px',
    allDaySlot: false,
    datesSet: this.getEventsForDate.bind(this),
    initialView: 'resourceTimeGrid',
    events: [],
    resources: this.resources,
    plugins: [
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
      interactionPlugin,
      resourceTimeGridPlugin,
      scrollGridPlugin,
    ],
    schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives'
  };

  companies: any[] = [];

  toggleUpdate() {
    this.updateThisAndFutureClasses = !this.updateThisAndFutureClasses;
  }

  constructor(
    private classroomApiService: ClassroomApiService,
    private eventApiService: EventApiService,
    private companyApiService: CompanyApiService,
    private teacherApiService: TeacherApiService,
    public userService: UserService
  ) { }

  public getEventsForDate(dateInfo: any) {
    let date = dateInfo.startStr.substring(0, 10);
    this.eventApiService.getEvents(date, 'true').subscribe(res => {
      this.calendarOptions.events = res.data;
    });
  }

  toggleScroll() {
    if (this.allowScroll) {
      this.calendarOptions.dayMinWidth = 80;
    } else {
      this.calendarOptions.dayMinWidth = false;
    }
  }

  updateEvent(info: any): void {
    if (this.updateThisAndFutureClasses) {
      this.eventApiService.updateEventTeacherForGroup(info.event.id, info.newResource.id).subscribe(res => {
        console.log('updated');
      });
    } else {
      this.eventApiService.updateEventTeacher(info.event.id, info.newResource.id).subscribe(res => {
        console.log('updated');
      });
    }
  }

  filterResources() {
    this.calendarOptions.resources = this.resources.filter((r) => {
      if (r.company_id === 'not_set') {
        return true;
      }
      if (this.selectedSimpleItem.includes('not_set')) {
        this.selectedSimpleItem = ['not_set'];
        return true;
      }
      return this.selectedSimpleItem.includes(r.company_id);
    });
  }

  ngOnInit(): void {
    this.activeUser = this.userService.getUser();
    if (this.userService.canEditTimetable()) {
      this.calendarOptions.editable = true;
    }
    this.companyApiService.getCompanies().subscribe(res => {
      let all = [{id: 'not_set', name: 'All companies'}];
      this.simpleItems = all.concat(res.data);
      this.teacherApiService.getTeachers().subscribe(res => {
        this.resources = res.data;
        this.selectedSimpleItem = ['not_set'];
        this.filterResources();
      });
      this.eventApiService.getEvents('', 'true').subscribe((res) => {
        this.calendarOptions.events = res.data;
      });
    });
  }

  updateDate(event: any): void {
    this.calendarComponent.getApi().gotoDate(this.getDateString(event));
  }

  private getDateString(dateObject: any): string {
    return `${dateObject.year}-${this.pad(dateObject.month)}-${this.pad(dateObject.day)}`;
  }

  private pad(num:number, size: number = 2): string {
    let s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }

}
