import {Component, OnInit, ViewChild} from '@angular/core';
import {EventApiService} from "../../../../core/services/event.api.service";
import {GroupApiService} from "../../../../core/services/group.api.service";
import {TeacherApiService} from "../../../../core/services/teacher.api.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {EventTypeApiService} from "../../../../core/services/event-type.api.service";
import {DepartmentApiService} from "../../../../core/services/department.api.service";
import {ClassroomApiService} from "../../../../core/services/classroom.api.service";
import {CompanyApiService} from "../../../../core/services/company.api.service";
import {UserService} from "../../../../core/services/user.service";
import {NgbDatepickerConfig} from "@ng-bootstrap/ng-bootstrap";
import {DatePipe} from "@angular/common";
import Swal from "sweetalert2";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  selectedGroup: any;
  minEndDate: any;
  error: any[] = [];
  selectedSimpleItem: any = null;
  activeUser: any;
  form: FormGroup;
  companies: any[] = [];
  groups: any[] = [];
  teachers: any[] = [];
  eventTypes: any[] = [];
  classrooms: any[] = [];
  departments: any[] = [];
  filtered_companies: any[] = [];
  filtered_groups: any[] = [];
  filtered_teachers: any[] = [];
  filtered_eventTypes: any[] = [];
  filtered_classrooms: any[] = [];
  filtered_departments: any[] = [];
  event: any = null;
  daysOfTheWeek = [{
    name: 'Monday',
    id: 1
  }, {
    name: 'Tuesday',
    id: 2
  }, {
    name: 'Wednesday',
    id: 3
  },{
    name: 'Thursday',
    id: 4
  }, {
    name: 'Friday',
    id: 5
  }, {
    name: 'Saturday',
    id: 6
  }];

  eventType: any;

  @ViewChild('date_range_end', { static: false }) date_range_end: any;

  constructor(
    private eventApiService: EventApiService,
    private eventTypeApiService: EventTypeApiService,
    private groupApiService: GroupApiService,
    private teacherApiService: TeacherApiService,
    private departmentApiService: DepartmentApiService,
    private classroomApiService: ClassroomApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    private companyApiService: CompanyApiService,
    private userService: UserService,
    private config: NgbDatepickerConfig,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.activeUser = this.userService.getUser();
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      classroom_id: [null, Validators.required],
      company_id: [null, Validators.required],
      teacher_id: [null, Validators.required],
      event_type_id: [null, Validators.required],
      group_id: [null, Validators.required],
      department_id: ['not_set', Validators.required],
      date_range_start: ['', Validators.required],
      date_range_end: ['', Validators.required],
      days_of_the_week: ['', Validators.required],
      time_start: [null, Validators.required],
      time_end: [null, Validators.required],
      status_id: 1,
    });

    this.form.get('start_date')?.valueChanges.subscribe((startDate: any) => {
      if (startDate) {
        this.minEndDate = startDate;
        this.config.minDate = startDate;
        this.date_range_end.navigateTo({ year: startDate.year, month: startDate.month });
      }
    });

    if (this.activeUser.user_role === 'super_admin' || this.activeUser.user_role === 'admin') {
      this.companyApiService.getCompanies().subscribe(res => {
        this.companies = res.data;
      })
    }

    this.groupApiService.getGroups().subscribe(res => {
      this.groups = res.data;
      this.filtered_groups = res.data;
    });

    this.teacherApiService.getTeachers().subscribe(res => {
      let data = [{
        id: 'not_set',
        name: 'Unassigned',
      }];
      let _data = data.concat(res.data);
      this.teachers = _data;
      this.filtered_teachers = _data;
    });

    this.eventTypeApiService.getAll().subscribe(res => {
      this.eventTypes = res.data;
      this.filtered_eventTypes = res.data;
    })

    this.departmentApiService.getAll().subscribe(res => {
      let data = [{
        id: 'not_set',
        name: 'Unassigned',
      }]
      let _data = data.concat(res.data);
      this.departments = _data;
      this.filtered_departments = _data;
    });

    this.classroomApiService.getClassrooms().subscribe(res => {
      this.classrooms = res.data;
      this.filtered_classrooms = res.data;
    })
  }

  public onSubmit(): void {
    this.error = [];
    let event = this.createEvent();
    this._submit(event);
  }

  public onSubmitAndStay(): void {
    this.error = [];
    let event = this.createEvent();
    this._submit(event, true);
  }

  private fireSwal(): void {
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Event(s) added correctly",
    });
  }

  private _submit(event: any, stayHere: boolean = false): void {
    this.eventApiService.createEvent(event).subscribe(res => {
      if (stayHere) {
        this.fireSwal();
        return;
      } else {
        this.router.navigate(['/event']);
        return;
      }
    }, error => {
      if (error.errors) {
        for (let key in error.errors) {
          this.form.controls[key].setErrors({error: error.errors[key]});
        }
      } else {
        this.error.push(error.message);
      }
    });
  }

  private createEvent(): any {
    let event = this.form.value;
    event.date_range_end = this.getDateString(event.date_range_end)
    event.date_range_start = this.getDateString(event.date_range_start)
    event.time_start = this.getTimeString(event.time_start);
    event.time_end = this.getTimeString(event.time_end);
    return event;
  }

  private getDateString(dateObject: any): string {
    return `${dateObject.year}-${this.pad(dateObject.month)}-${this.pad(dateObject.day)}`;
  }

  filterDepartments(event: any): void {
    if (event.name !== 'Lectiva') {

    }
  }

  stringToDateObject(dateString: string): any {
    const year =  Number(this.datePipe.transform(dateString, 'yyyy'));
    const month =  Number(this.datePipe.transform(dateString, 'MM'));
    const day =  Number(this.datePipe.transform(dateString, 'dd'));
    return {
      year: year ,
      month: month ,
      day: day
    };
  }

  stringToTimeObject(dateString: string): any {
    const sections = dateString.split(':');
    return {
      hour: parseInt(sections[0]),
      minute: parseInt(sections[1]),
    };
  }

  updateName(): void {
    let groups = this.groups.filter(group => {
      return group.id === this.form.get('group_id')?.value
    });
    if (groups.length > 0) {
      const group = groups[0];
      console.log(this.stringToTimeObject(group.start_time));
      this.form.patchValue({
        name: group.name,
        days_of_the_week: group.days_of_the_week,
        date_range_start: this.stringToDateObject(group.date_start),
        date_range_end: this.stringToDateObject(group.date_end),
        time_start: this.stringToTimeObject(group.start_time),
        time_end: this.stringToTimeObject(group.end_time),
      })
    }
  }

  private getTimeString(timeObject: any, seconds: boolean = false): string {
    let string = `${this.pad(timeObject.hour)}:${this.pad(timeObject.minute)}`;
    if (seconds) {
      string += `:${this.pad(timeObject.second)}`;
    }
    return string;
  }

  private pad(num:number, size: number = 2): string {
    let s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }

  filterSelects() {
    this.classrooms = this.filtered_classrooms.filter((r) => {
      return r.company_id === this.selectedSimpleItem;
    });
  }
}
