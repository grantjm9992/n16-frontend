import {Component, Input, OnInit} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup} from "@angular/forms";
import {ClassroomApiService} from "../../../../core/services/classroom.api.service";
import {TeacherApiService} from "../../../../core/services/teacher.api.service";
import {EventTypeApiService} from "../../../../core/services/event-type.api.service";
import {DepartmentApiService} from "../../../../core/services/department.api.service";
import {UserService} from "../../../../core/services/user.service";

@Component({
  selector: 'app-edit-event-modal',
  templateUrl: './edit-event-modal.component.html',
  styleUrls: ['./edit-event-modal.component.scss']
})
export class EditEventModalComponent implements OnInit {

  @Input() form: FormGroup;
  onSubmit: (eventName: string) => void;
  onDeleteClass: (eventName: string) => void;
  statuses: any[] = [
    {
      id: '1',
      name: 'Active'
    },
    {
      id: '2',
      name: 'Cancelled + 24h'
    },
    {
      id: '3',
      name: 'Cancelled - 24h'
    },
    {
      id: '4',
      name: 'Cancelled - Holiday'
    },
  ]
  teachers: any[] = [];
  eventTypes: any[] = [];
  classrooms: any[] = [];
  departments: any[] = [];
  isSuperAdmin: boolean = false;
  classroomsLoaded: boolean = false;
  teachersLoaded: boolean = false;
  eventTypesLoaded: boolean = false;
  departmentsLoaded: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private classroomApiService: ClassroomApiService,
    private teacherApiService: TeacherApiService,
    private eventTypeApiService: EventTypeApiService,
    private departmentApiService: DepartmentApiService,
    private userService: UserService
  ) { }

  submitForm() {
    if (this.onSubmit) {
      if (this.departmentsLoaded && this.eventTypesLoaded && this.teachersLoaded && this.classroomsLoaded) {
        this.onSubmit(this.form.value);
      }
    }
  }

  deleteClass() {
    if (this.onDeleteClass) {
      this.onDeleteClass(this.form.value);
    }
  }


  ngOnInit(): void {
    let activeUser = this.userService.getUser();
    this.isSuperAdmin = activeUser.user_role === 'super_admin';
    let company_id = '';
    this.teacherApiService.getTeachers(company_id).subscribe((res: any) => {
      let data = [{
        id: 'not_set',
        name: 'Unassigned',
      }]
      this.teachers = data.concat(res.data);
      this.teachersLoaded = true;
    });
    this.classroomApiService.getClassrooms(company_id).subscribe((res: any) => {
      let data = [{
        id: 'not_set',
        name: 'Unassigned',
      }]
      this.classrooms = data.concat(res.data);
      this.classroomsLoaded = true;
    });
    this.eventTypeApiService.getAll(`company_id=${company_id}`).subscribe((res: any) => {
      this.eventTypes = res.data;
      this.eventTypesLoaded = true;
    });
    this.departmentApiService.getAll(`company_id=${company_id}`).subscribe((res: any) => {
      let data = [{
        id: 'not_set',
        name: 'Unassigned',
      }]
      this.departments = data.concat(res.data);
      this.departmentsLoaded = true;
    });
  }

}
