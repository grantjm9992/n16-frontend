export class UpdateEventRequest {
  description: string;
  classroom_id: string;
  teacher_id: string;
  event_type_id: string;
  department_id: string;
  start_date: string;
  end_date: string;
  status_id: string;
}

export function createUpdateEventRequestFromObject(obj: any): UpdateEventRequest {
  const request: UpdateEventRequest = {} as UpdateEventRequest;
  request.description = obj.description;
  request.classroom_id = obj.classroom_id;
  request.teacher_id = obj.teacher_id;
  request.event_type_id = obj.event_type_id;
  request.department_id = obj.department_id;
  request.start_date = obj.start_date;
  request.end_date = obj.end_date;
  request.status_id = obj.status_id;
  return request;
}
