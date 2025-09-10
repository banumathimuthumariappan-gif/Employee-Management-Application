export interface Employee {
  employeeId: number;
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  dateOfJoining: string;
  departmentName: string;
  designationName: string;
  employeeType: string;
  salary: number;
}

export interface Departments {
  departmentId: number;
  departmentName: string;
}

export interface Designation {
  designationId: number,
  departmentId: number,
  designationName: string;
}

export interface EmployeeType {
  employeeTypeId: number;
  employeeTypeName: string;
}