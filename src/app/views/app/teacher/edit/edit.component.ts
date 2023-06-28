import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CompanyApiService} from "../../../../core/services/company.api.service";
import {TeacherApiService} from "../../../../core/services/teacher.api.service";
import {UserService} from "../../../../core/services/user.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  error: any[] = [];
  activeUser: any;
  formGroup: FormGroup;
  user: any = null;
  id: string|null = null;
  companies: any[] = [];
  colour: any;
  text_colour: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private teacherApiService: TeacherApiService,
    private companyApiService: CompanyApiService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      user_role: ['teacher', Validators.required],
      company_id: ['', Validators.required],
      start_date: [''],
      leave_date: [''],
      hours: [31, Validators.required],
      start_hours: [null, Validators.required],
      colour: ['', Validators.required],
      text_colour: ['', Validators.required],
    });
    this.activeUser = this.userService.getUser();
    if (this.activeUser.user_role !== 'super_admin' && this.activeUser.user_role !== 'admin') {
      this.formGroup.patchValue({company_id: this.activeUser.company_id});
    }
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id !== null && this.id !== 'new') {
      this.teacherApiService.getTeacher(this.id).subscribe((response) => {
        this.user = response.data;
        this.formGroup.patchValue(response.data);

        const startDate = this.user.start_date;
        if (startDate) {
          const iniYear =  Number(this.datePipe.transform(startDate, 'yyyy'));
          const iniMonth =  Number(this.datePipe.transform(startDate, 'MM'));
          const iniDay =  Number(this.datePipe.transform(startDate, 'dd'));
          this.formGroup.controls.start_date.setValue({
            year: iniYear ,
            month: iniMonth ,
            day: iniDay
          });
        }
        const leaveDate = this.user.leave_date;
        if (leaveDate) {
          const leaveYear =  Number(this.datePipe.transform(leaveDate, 'yyyy'));
          const leaveMonth =  Number(this.datePipe.transform(leaveDate, 'MM'));
          const leaveDay =  Number(this.datePipe.transform(leaveDate, 'dd'));
          this.formGroup.controls.leave_date.setValue({
            year: leaveYear ,
            month: leaveMonth ,
            day: leaveDay
          });
        }
        this.colour = this.user.colour;
        this.text_colour = this.user.text_colour;
      });
    }

    this.companyApiService.getCompanies().subscribe((res) => {
      let data = [{
        id: 'not_set',
        name: 'All companies',
      }];
      this.companies = data.concat(res.data);
    })
  }

  delete() {
    if (this.user.id) {
      this.teacherApiService.deleteTeacher(this.user.id, (new Date()).toDateString()).subscribe(res => {
        this.router.navigate(['/teacher']);
      });
    }
  }

  private getDateString(dateObject: any): string {
    return `${dateObject.year}-${this.pad(dateObject.month)}-${this.pad(dateObject.day)}`;
  }

  private pad(num:number, size: number = 2): string {
    let s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }

  onSubmit() {
    this.error = [];
    const _user: any = { ...this.user, ...this.formGroup.value };
    if (_user.start_date) {
      _user.start_date = this.getDateString(_user.start_date)
    }
    if (_user.leave_date) {
      _user.leave_date = this.getDateString(_user.leave_date)
    }
    if (this.id === 'new') {
      this.teacherApiService.createTeacher(_user).subscribe(() => {
        this.router.navigate(['/teacher']);
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
      return;
    }
    this.teacherApiService.updateTeacher(this.user.id, _user).subscribe(() => {
      this.router.navigate(['/teacher']);
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
  }

  onTextColourChange(event: any) {
    this.formGroup.patchValue({'text_colour': event});
  }

  onColourChange(event: any) {
    this.formGroup.patchValue({'colour': event});
  }
}
