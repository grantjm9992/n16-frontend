import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getUser() {
    let user = localStorage.getItem('user');
    if (user != null) {
      return JSON.parse(user);
    }
  }

  canEditTimetable(): boolean {
    let user = this.getUser();
    return ['admin', 'super_admin', 'company_admin'].includes(user.user_role);
  }
}
