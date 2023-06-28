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
import {UserService} from "../../../core/services/user.service";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EditEventModalComponent} from "./edit-event-modal/edit-event-modal.component";
import Swal from "sweetalert2";
import {ViewEventModalComponent} from "./view-event-modal/view-event-modal.component";
import {DatePipe} from "@angular/common";
import {createUpdateEventRequestFromObject} from "../../../core/requests/update-event.request";
import {createUpdateEventsForGroupRequestFromObject} from "../../../core/requests/update-events-for-group.request";
import {FullCalendarComponent} from "@fullcalendar/angular";


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  updateThisAndFutureClasses: boolean = false;
  classroom: string = '';
  activeUser: any;
  resources: any[] = [];
  simpleItems: any = [];
  selectedDate: any = null;
  form: FormGroup;
  selectedSimpleItem: any;
  allowScroll: boolean = false;
  calendarOptions: any = {
    eventClick: this.clickEvent.bind(this),
    editable: false,
    eventStartEditable: false,
    eventDurationEditable: false,
    eventDrop: this.updateEvent.bind(this),
    resourceEditable: false,
    startParam: 'start_date',
    endParam: 'end_date',
    titleParam: 'description',
    slotMinTime: '07:00:00',
    slotMaxTime: '23:00:00',
    snapDuration: '00:05:00',
    eventMinHeight: 5,
    height: '830px',
    contentHeight: '830px',
    allDaySlot: false,
    datesSet: this.getEventsForDateInfo.bind(this),
    initialView: 'resourceTimeGrid',
    events: [],
    titleFormat: {
      month: 'long',
      year: 'numeric',
      day: 'numeric',
      weekday: 'long'
    },
    resourceOrder: 'order',
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

  constructor(
    private classroomApiService: ClassroomApiService,
    private eventApiService: EventApiService,
    private companyApiService: CompanyApiService,
    public userService: UserService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) { }

  public getEventsForDateInfo(dateInfo: any) {
    let date = dateInfo.startStr.substring(0, 10);
    this.getEventsForDateString(date);
  }

  private getEventsForDateString(date: string) {
    this.eventApiService.getEvents(date).subscribe(res => {
      this.calendarOptions.events = res.data;
    });
  }

  updateDate(event: any): void {
    this.calendarComponent.getApi().gotoDate(this.getDateString(event));
  }

  toggleUpdate() {
    this.updateThisAndFutureClasses = !this.updateThisAndFutureClasses;
  }

  updateEvent(info: any): void {
    if (this.updateThisAndFutureClasses) {
      type Org = {[key: string] : null|string}
      const updateObject: Org = {}
      if (info.newResource) {
        updateObject.classroom_id = info.newResource.id;
      }
      if (info.event.startStr != info.oldEvent.startStr) {
        updateObject.time_start = this.datePipe.transform(info.event.startStr, 'HH:mm');
        updateObject.time_end = this.datePipe.transform(info.event.endStr, 'HH:mm');
      }
      updateObject.date_range_start = this.datePipe.transform(info.event.endStr, 'Y-MM-dd');

      this.eventApiService.updateEventForGroup(info.event._def.extendedProps.group_id, updateObject).subscribe(res => {
        this.getEventsForDateInfo(info.event);
      });
    } else {
      if (info.newResource) {
        this.eventApiService.updateEventClassroom(info.event.id, info.newResource.id).subscribe(res => {
          this.getEventsForDateInfo(info.event);
        });
      }
      if (info.event.startStr != info.oldEvent.startStr) {
        this.eventApiService.updateEventStart(info.event.id, {
          start_date: this.datePipe.transform(info.event.startStr, 'Y-MM-dd HH:mm'),
          end_date: this.datePipe.transform(info.event.endStr, 'Y-MM-dd HH:mm')
        }).subscribe(res => {
          this.getEventsForDateInfo(info.event);
        });
      }
    }
  }

  clickEvent(info: any): void {
    let eventId = info.event._def.publicId;
    if (!this.userService.canEditTimetable()) {
      const modalRef: NgbModalRef = this.modalService.open(ViewEventModalComponent);
      modalRef.componentInstance.event = info.event;
      return;
    }
    this.eventApiService.getEvent(eventId).subscribe((res: any) => {
      const event = res.data;
      const modalRef: NgbModalRef = this.modalService.open(EditEventModalComponent);
      modalRef.componentInstance.form = this.formBuilder.group({
        description: ['', Validators.required],
        classroom_id: ['', Validators.required],
        company_id: ['', Validators.required],
        teacher_id: ['', Validators.required],
        event_type_id: [null, Validators.required],
        group_id: ['', Validators.required],
        department_id: [null, Validators.required],
        start_date: ['', Validators.required],
        end_date: ['', Validators.required],
        days_of_the_week: ['', Validators.required],
        status_id: 1,
      });
      modalRef.componentInstance.form.patchValue(event);
      modalRef.componentInstance.onSubmit = () => {
        const _event: any = modalRef.componentInstance.form.getRawValue();
        if (_event.department_id === null || _event.event_type_id === null) {
          return;
        }
        if (this.updateThisAndFutureClasses) {
          _event.date_range_start = this.datePipe.transform(info.event.endStr, 'Y-MM-d');
          const request = createUpdateEventsForGroupRequestFromObject(_event);
          this.eventApiService.updateEventForGroup(_event.group_id, request).subscribe((res: any) => {
            this.getEventsForDateInfo(info.event);
            modalRef.close();
          });
        } else {
          const updateRequest = createUpdateEventRequestFromObject(_event);
          this.eventApiService.updateEvent(eventId, updateRequest).subscribe((res: any) => {
            this.getEventsForDateInfo(info.event);
            modalRef.close();
          });
        }
      };
      modalRef.componentInstance.onDeleteClass = () => {
        let event = modalRef.componentInstance.form.value;
        Swal.fire({
          title: 'Delete all events for this group?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          cancelButtonText: 'Cancel',
          confirmButtonText: 'Yes, all from this date',
          denyButtonText: 'No, just this class',
          showDenyButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            this.eventApiService.deleteEventsForGroup(event.group_id, event.start_date).subscribe(res => {
              modalRef.close();
            });
          }
          if (result.isDenied) {
            this.eventApiService.deleteEvent(eventId).subscribe(res => {
              modalRef.close();
            });
          }
        })
      };
    });
  }

  filterResources() {
    if (this.selectedSimpleItem.includes('not_set')) {
      this.selectedSimpleItem = ['not_set'];
    }
    this.calendarOptions.resources = this.resources.filter((r) => {
      return this.nameFilter(r) && this.companyFilter(r);
    });
  }

  toggleScroll() {
    if (this.allowScroll) {
      this.calendarOptions.dayMinWidth = 80;
    } else {
      this.calendarOptions.dayMinWidth = false;
    }
  }

  nameFilter(r: any): boolean {
    if (this.classroom === '') {
      return true;
    }
    return r.title.includes(this.classroom);
  }

  companyFilter(r: any): boolean {
    if (this.selectedSimpleItem.includes('not_set')) {
      return true;
    }
    return this.selectedSimpleItem.includes(r.company_id);
  }

  ngOnInit(): void {
    this.activeUser = this.userService.getUser();
    if (this.userService.canEditTimetable()) {
      this.calendarOptions.editable = true;
      this.calendarOptions.eventStartEditable = true;
      this.calendarOptions.resourceEditable = true;
    }
    this.companyApiService.getCompanies().subscribe(res => {
      let all = [{id: 'not_set', name: 'All companies'}];
      this.simpleItems = all.concat(res.data);
      this.classroomApiService.getClassrooms().subscribe(res => {
        this.resources = res.data;
        this.selectedSimpleItem = 'not_set';
        if (this.activeUser.user_role !== 'super_admin') {
          this.selectedSimpleItem = [this.activeUser.company_id];
        }
        this.filterResources();
      });
      this.eventApiService.getEvents().subscribe((res) => {
        this.calendarOptions.events = res.data;
      });
    });
  }

  onSubmit(): void {}

  private getDateString(dateObject: any): string {
    return `${dateObject.year}-${this.pad(dateObject.month)}-${this.pad(dateObject.day)}`;
  }

  private pad(num:number, size: number = 2): string {
    let s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }
}
