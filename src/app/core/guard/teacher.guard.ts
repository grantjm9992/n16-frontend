import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import {UserService} from "../services/user.service";

@Injectable()
export class TeacherGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let user = this.userService.getUser();
    if (user.user_role !== 'teacher' && user.user_role !== 'director') {
      this.router.navigate(['/dashboard'], { queryParams: { returnUrl: state.url } });
      return false;
    }

    return true;
  }
}
