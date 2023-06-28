import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ClassroomApiService} from "../../../../core/services/classroom.api.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CompanyApiService} from "../../../../core/services/company.api.service";
import {UserService} from "../../../../core/services/user.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  error: any[] = [];
  companies: any[] = [];
  activeUser: any;
  classroomForm: FormGroup;
  classroom: any = null;
  fill_colour: any;
  text_colour: any;
  id: any = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private classroomApiService: ClassroomApiService,
    private companyApiService: CompanyApiService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.classroomForm = this.formBuilder.group({
      name: ['', Validators.required],
      order: ['', Validators.required],
      capacity: ['', Validators.required],
      company_id: [null, Validators.required],
    });
    this.activeUser = this.userService.getUser();
    if (this.activeUser.user_role !== 'super_admin' && this.activeUser.user_role !== 'admin') {
      this.classroomForm.patchValue({company_id: this.activeUser.company_id});
    }
    this.companyApiService.getCompanies().subscribe(res => {
      this.companies = res.data;
    })
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.activatedRoute.paramMap.subscribe(res => {
      console.log(res.get('id'));
      let id = res.get('id')
      if (id === null || id === 'new') {
        return;
      }
      this.classroomApiService.getClassroom(id).subscribe((response) => {
        this.classroom = response.data;
        this.classroomForm.patchValue(response.data);
      });
    })
  }

  onTextColourChange(event: any) {
    this.classroomForm.patchValue({'text_colour': event});
  }

  onFillColourChange(event: any) {
    this.classroomForm.patchValue({'fill_colour': event});
  }


  onSubmit() {
    this.error = [];
    const updatedClassroom: any = { ...this.classroom, ...this.classroomForm.value };
    if (this.id === 'new') {
      this.classroomApiService.createClassroom(updatedClassroom).subscribe(() => {
        this.router.navigate(['/classroom']);
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
    this.classroomApiService.updateClassroom(this.classroom.id, updatedClassroom).subscribe(() => {
      this.router.navigate(['/classroom']);
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

  delete() {
    this.classroomApiService.remove(this.classroom.id).subscribe(res => {
      this.router.navigate(['/classroom']);
    })
  }
}
