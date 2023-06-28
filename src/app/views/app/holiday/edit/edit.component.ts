import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HolidayApiService} from "../../../../core/services/holiday.api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TeacherApiService} from "../../../../core/services/teacher.api.service";
import {UserService} from "../../../../core/services/user.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  teachers: any[] = [];
  form: FormGroup;
  error: any[] = [];
  id: any;
  holiday: any;
  activeUser: any;

  constructor(
    private userService: UserService,
    private teacherApiService: TeacherApiService,
    private holidayApiService: HolidayApiService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.activeUser = this.userService.getUser();
    this.teacherApiService.getTeachers().subscribe(res => {
      this.teachers = res.data;
    });
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.activeUser.user_role === 'teacher') {
      this.form = this.formBuilder.group({
        start_date: ['', Validators.required],
        end_date: ['', Validators.required],
        notes: ['',],
      });
    } else {
      this.form = this.formBuilder.group({
        teacher_id: [null, Validators.required],
        start_date: ['', Validators.required],
        end_date: ['', Validators.required],
        notes: ['',],
      });
    }
    if (this.id !== null && this.id !== 'new') {
      this.holidayApiService.find(this.id).subscribe((response) => {
        this.holiday = response.data;
        this.form.patchValue(response.data);
        console.log(this.holiday.start_date);
        this.form.patchValue({
          start_date: this.stringToDateObject(this.holiday.start_date),
          end_date: this.stringToDateObject(this.holiday.end_date),
        });
      });
    }
  }

  onSubmit() {
    this.error = [];
    let event = this.form.value;
    event.start_date = this.getDateString(event.start_date);
    event.end_date = this.getDateString(event.end_date);
    if (this.id === 'new') {
      this.holidayApiService.create(event).subscribe(res => {
        this.router.navigate(['/holiday']);
      }, error => {
        if (error.errors) {
          for (let key in error.errors) {
            error.errors[key].forEach((err: string) => {
              this.error.push(err);
            })
          }
        } else {
          this.error.push(error.message);
        }
      });
    } else {
      this.holidayApiService.update(this.id, event).subscribe(res => {
        this.router.navigate(['/holiday']);
      }, error => {
        if (error.errors) {
          for (let key in error.errors) {
            error.errors[key].forEach((err: string) => {
              this.error.push(err);
            })
          }
        } else {
          this.error.push(error.message);
        }
      })
    }
  }

  getUser(user: any): string {
    return user.name + ' ' + user.surname;
  }

  private getDateString(dateObject: any): string {
    return `${dateObject.year}-${this.pad(dateObject.month)}-${this.pad(dateObject.day)}`;
  }

  private pad(num:number, size: number = 2): string {
    let s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }

  customSearchFn(term: string, item: any) {
    term = term.toLocaleLowerCase();
    return item.name.toLocaleLowerCase().indexOf(term) > -1 || item.surname.toLocaleLowerCase().indexOf(term) > -1;
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
}
