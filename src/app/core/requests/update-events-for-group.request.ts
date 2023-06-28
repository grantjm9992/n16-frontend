export class UpdateEventsForGroupRequest {
  description: string;
  classroom_id: string;
  teacher_id: string;
  event_type_id: string;
  department_id: string;
  date_range_start: string;
  time_start?: string;
  time_end?: string;
}

export function createUpdateEventsForGroupRequestFromObject(obj: any): UpdateEventsForGroupRequest {
  const request: UpdateEventsForGroupRequest = {} as UpdateEventsForGroupRequest;
  request.description = obj.description;
  request.classroom_id = obj.classroom_id;
  request.teacher_id = obj.teacher_id;
  request.event_type_id = obj.event_type_id;
  request.department_id = obj.department_id;
  request.date_range_start = obj.date_range_start;
  if (obj.time_start) {
    request.time_start = obj.time_start;
  }
  if (obj.time_end) {
    request.time_end = obj.time_end;
  }
  return request;
}
