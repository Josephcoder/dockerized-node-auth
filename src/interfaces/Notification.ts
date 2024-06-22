export enum TeacherNotificationCategoryEnum {
  CLASS_GROUP_AND_COURSE = 'CLASS_GROUP_AND_COURSE', // Course and class groups are mapped
  STUDENTS = 'STUDENTS',
}

export enum TeacherNotificationReasonEnum {
  MISSING = 'MISSING', // To be added in the SDMS
  TO_BE_REMOVED = 'TO_BE_REMOVED',
}

export enum TeacherNotificationStatusEnum {
  PENDING = 'PENDING', // Not seen by HT
  READ = 'READ', // Seen by HT
  RESOLVED = 'RESOLVED', // HT updated the SDMS
}

export interface TeacherNotificationValueInterface {
  id: string;
  name: string; // Name of course, class group or student
  class_group_id: string; // Every notification is depending on class group
  reason: TeacherNotificationReasonEnum;
}
// Notification is sent depending on the selected category: COURSES, CLASS_GROUPS, STUDENTS
// Because he/she will be selecting
export interface TeacherNotificationInterface {
  notification_id: string;
  category: TeacherNotificationCategoryEnum;
  value: TeacherNotificationValueInterface[];
  status: TeacherNotificationStatusEnum;
  staff_id: string;
  school_code: string;
}
