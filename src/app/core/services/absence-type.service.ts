import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {AbsenceTypesData} from "../data/absence-types.data";

@Injectable({
    providedIn: "root"
})
export class AbsenceTypeService {
    get(): Observable<any> {
        return of(AbsenceTypesData.absenceTypes)
    }


}