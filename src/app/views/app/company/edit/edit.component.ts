import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ClassroomApiService} from "../../../../core/services/classroom.api.service";
import {CompanyApiService} from "../../../../core/services/company.api.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  error: any[] = [];
  companyForm: FormGroup;
  company: any;
  fill_colour: any;
  text_colour: any;
  id: string|null = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private companyApiService: CompanyApiService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.companyForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id !== null && this.id !== 'new') {
      this.companyApiService.getCompany(this.id).subscribe((response) => {
        this.company = response.data;
        this.companyForm.patchValue(response.data);
      });
    }
  }

  onSubmit() {
    this.error = [];
    const updatedCompany: any = { ...this.company, ...this.companyForm.value };
    if (this.id === 'new') {
      this.companyApiService.createCompany(updatedCompany).subscribe(() => {
        this.router.navigate(['/company']);
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
    this.companyApiService.updateCompany(this.company.id, updatedCompany).subscribe(() => {
      this.router.navigate(['/company']);
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
}
