export interface AbsenceType {
    id: string;
    name: string;
}

export class AbsenceTypesData {
    public static absenceTypes: AbsenceType[] = [{
        id: 'holiday',
        name: 'Holiday'
    }, {
        id: 'short_term_medical_leave',
        name: 'Short term medical leave'
    }, {
        id: 'short_term_medical_leave',
        name: 'Short term medical leave'
    }, {
        id: 'work_absence',
        name: 'Work absence'
    }, {
        id: 'unjustified',
        name: 'Unjustified'
    }, {
        id: 'other',
        name: 'Other'
    }];
}