export interface User {
  id: number;
  staff_id: string;
  staff_position_id: string;
  staff_location_id: string;
  staff_type: string;
  school_id: string;
  names: string;
  phone_number: string;
  email: string;
  defaultLanguage: string;
  password: string;
  ussd_pin: number;
  last_login: number;
  last_ussd_login: string;
  status: number;
  created_at: string;
  updated_at: string;
}
export interface UserLogin {
  id: number;
  staff_id: string;
  staff_position_id: string;
  staff_location_id: string;
  staff_type: string;
  school_id: string;
  names: string;
  phone_number: string;
  email: string;
  password: string;
  ussd_pin: number;
  location_name: string;
  school_name: string;
  roles: {
    role_id: string;
    role: string;
    access_level: string;
    access: string[];
  } | null;
}
export interface SchoolTeacher {
  teachers: number;
  code: number;
}
