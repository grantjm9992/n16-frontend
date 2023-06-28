import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthApiService} from "../../../../core/services/auth.api.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  returnUrl: any;
  email: string;
  password: string;
  errorMessage: string;

  constructor(private router: Router, private route: ActivatedRoute, private authApiService: AuthApiService) { }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    this.authApiService.login(this.email, this.password).subscribe((response: any) => {
      localStorage.setItem('isLoggedin', 'true');
      localStorage.setItem('token', response.authorisation.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      if (localStorage.getItem('isLoggedin')) {
        this.router.navigate([this.returnUrl]);
      }
    });
  }

}
