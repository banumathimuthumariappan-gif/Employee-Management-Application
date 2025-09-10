import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Designation } from '../../model/employee.model';

@Component({
  selector: 'app-employee',
  imports: [NgForOf, NgIf, FormsModule, DatePipe],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent implements OnInit {
  showForm: boolean = false;
  departments: any = [];
  designations: any = [];
  selectedDesignation: any = [];
  employeeTypes: any = [];
  allEmployees: any = [];
  editingEmployee = false;
  employeeId: number = 5;

  employeeData = {
    employeeId: 0,
    fullName: '',
    email: '',
    phone: '',
    gender: '',
    dateOfJoining: '',
    departmentId: '',
    departmentName: '',
    designationName: '',
    employeeType: '',
    salary: 0,
  };

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.getAllEmployees();
    this.getEmployeeTypes();
    this.getDepartments();
    this.getDesignation();
  }

  closeAddEmployeeForm() {
    this.showForm = false;
  }

  createEmployee(form: any) {
    if(form.valid) {
      
      if(this.editingEmployee === false) {
        // Adding new employee
        this.showForm = true;
        this.employeeData.employeeId = this.employeeId++;
        const selectedDepartment = this.departments.find(
          (department: any) =>
            department.departmentId == this.employeeData.departmentId
        );
        if (selectedDepartment) {
          this.employeeData.departmentName = selectedDepartment.departmentName;
        }
        this.employeeService.createEmployee();

      } else {
        // Editing existing employee

      }
     
    }

    

  }

  getEmptyFormData() {
    return {
      employeeId: 0,
      fullName: '',
      email: '',
      phone: '',
      gender: '',
      dateOfJoining: '',
      departmentId: '',
      departmentName: '',
      designationName: '',
      employeeType: '',
      salary: 0,
    };
  }

  // Getting the list of all employees
  getAllEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.allEmployees = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getDepartments() {
    this.employeeService.getDepartments().subscribe({
      next: (data) => {
        console.log(data);

        this.departments = data;
        console.log(this.departments);
      },
      error: (error) => {
        console.log('Error in getting departments');
      },
    });
  }

  onDepartmentIDSelected(value: any) {
    let departmentId = value;
    console.log('Department id selected: ' + departmentId);
    this.getSelectedDesignation(departmentId);
  }

  // Getting the list of Designation
  getDesignation() {
    this.employeeService.getDesignations().subscribe({
      next: (data) => {
        this.designations = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getSelectedDesignation(id: number) {
    const flatDesignations: Designation[] = this.designations.flat();
    console.log(flatDesignations);
    
    this.selectedDesignation = flatDesignations.filter(designation => designation.departmentId === +id);
    console.log(this.selectedDesignation);
    
    return this.selectedDesignation;
  }

  // Getting the employee types
  getEmployeeTypes() {
    this.employeeService.getEmployeeTypes().subscribe({
      next: (data) => {
        this.employeeTypes = data;
      },
      error: (error) => {
        console.log('Error in getting employee types');
      },
    });
  }

  // Getting Form with initial empty values
  showAddEmployeeForm() {
    this.showForm = true;
    this.employeeData = this.getEmptyFormData();
  }
}
