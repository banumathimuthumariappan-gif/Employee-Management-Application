import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Departments, Designation, Employee, EmployeeType } from '../model/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor() {}

  private employees: Employee[] = [
    {
      employeeId: 1,
      fullName: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      phone: '9876543210',
      gender: 'Female',
      dateOfJoining: '2023-03-15',
      departmentName: 'Technical',
      designationName: 'Developer',
      employeeType: 'Full Time',
      salary: 82000,
    },
    {
      employeeId: 2,
      fullName: 'Bob Smith',
      email: 'bob.smith@example.com',
      phone: '9123456789',
      gender: 'Male',
      dateOfJoining: '2022-11-02',
      departmentName: 'Sales',
      designationName: 'Sales lead',
      employeeType: 'Part Time',
      salary: 48000,
    },
    {
      employeeId: 3,
      fullName: 'Carol Lee',
      email: 'carol.lee@example.com',
      phone: '9988776655',
      gender: 'Female',
      dateOfJoining: '2023-01-20',
      departmentName: 'Marketing',
      designationName: 'Insta lead',
      employeeType: 'Intern',
      salary: 25000,
    },
    {
      employeeId: 4,
      fullName: 'David Brown',
      email: 'david.brown@example.com',
      phone: '9648327490',
      gender: 'Male',
      dateOfJoining: '2022-04-11',
      departmentName: 'Non Technical',
      designationName: 'Manager',
      employeeType: 'Contract',
      salary: 70000,
    },
    {
      employeeId: 5,
      fullName: 'Eva Miller',
      email: 'eva.miller@example.com',
      phone: '9001122334',
      gender: 'Female',
      dateOfJoining: '2021-09-28',
      departmentName: 'Technical',
      designationName: 'Tester',
      employeeType: 'Full Time',
      salary: 65000,
    },
  ];
  private employeeTypes = [
    { employeeTypeId: 1, employeeTypeName: 'Full Time' },
    { employeeTypeId: 2, employeeTypeName: 'Part Time' },
    { employeeTypeId: 3, employeeTypeName: 'Contract' },
    { employeeTypeId: 4, employeeTypeName: 'Intern' },
  ];
  private departments = [
    { departmentId: 1, departmentName: 'Technical' },
    { departmentId: 2, departmentName: 'Non Technical' },
    { departmentId: 3, departmentName: 'Sales' },
    { departmentId: 4, departmentName: 'Marketing' },
  ];
  private designations = [
    [
      { departmentId: 1, designationId: 1, designationName: 'Developer' },
      { departmentId: 1, designationId: 2, designationName: 'Tester' },
    ],
    [
      { departmentId: 2, designationId: 1, designationName: 'Document Creator'},
      { departmentId: 2, designationId: 2, designationName: 'Manager' },
    ],
    [
      { departmentId: 3, designationId: 1, designationName: 'Sales lead' },
      { departmentId: 3, designationId: 2, designationName: 'Sale manager' },
    ],
    [
      { departmentId: 4, designationId: 1, designationName: 'Newspaper' },
      { departmentId: 4, designationId: 2, designationName: 'Insta lead' },
    ],
  ];
  private currentUserSubject = new BehaviorSubject<String | null>(null);
  private employeeSubject = new BehaviorSubject<Employee[]>([
    ...this.employees,
  ]);
  private employeeTypeSubject = new BehaviorSubject<EmployeeType[]>([...this.employeeTypes]);
  private departmentsSubject = new BehaviorSubject<Departments[]>([...this.departments]);
  private designationsSubject = new BehaviorSubject<Designation[]>(
    this.designations.flat()
  );

  // Login
  login(userName: string, password: string) {
    if (userName == 'hradmin@gmail.com' && password == '112233') {
      this.currentUserSubject.next(userName);
      return of(true);
    }
    return of(false);
  }

  // Logout
  logout() {
    this.currentUserSubject.next(null);
  }

  // Get the list of employees
  getEmployees() {
    return this.employeeSubject.asObservable();
  }

  // Get the list of Employee Types
  getEmployeeTypes() {
    return this.employeeTypeSubject.asObservable();
  }

  // Get the list of Departments 
  getDepartments() {
    return this.departmentsSubject.asObservable();
  }

  // Get the list of Designations
  getDesignations() {
    return this.designationsSubject.asObservable();
  }

  createEmployee()  {
    
  }
}
