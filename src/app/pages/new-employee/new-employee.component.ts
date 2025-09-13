import { NgFor, NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Designation, Employee } from '../../model/employee.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-employee',
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './new-employee.component.html',
  styleUrl: './new-employee.component.css',
})
export class NewEmployeeComponent implements OnInit {
  editingEmployee = false;
  employeeId: number = 5;
  departments: any = [];
  designations: any = [];
  selectedDesignation: any = [];
  employeeTypes: any = [];
  selectedEmployee: Employee | null = null;
  showAlert: boolean = false;
  showEditAlert: boolean = false;

  employeeData: Employee = {
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

  ngOnInit() {
    this.getEmployeeTypes();
    this.getDepartments();
    this.getDesignation();
    this.getEditEmployeeData();
  }

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

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

  getEditEmployeeData() {
    this.route.queryParams.subscribe((params) => {
      const employeeId = params['id'];
      if (employeeId) {
        this.editingEmployee = true;
        this.loadEmployeeData(+employeeId);
      }
    });
  }

  loadEmployeeData(id: number) {
    this.employeeService.getEmployeeById(id).subscribe((employee) => {
      if (employee) {
        console.log(employee);
        this.selectedDesignation = this.getSelectedDesignation(
          +employee.departmentId
        );
        this.employeeData = { ...employee };
      }
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

    this.selectedDesignation = flatDesignations.filter(
      (designation) => designation.departmentId === +id
    );

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

  createEmployee(form: any) {
    if (form.valid) {
      if (this.editingEmployee === false) {
        // Adding new employee
        // this.showForm = true;
        this.employeeData.employeeId = ++this.employeeId;
        const selectedDepartment = this.departments.find(
          (department: any) =>
            department.departmentId == this.employeeData.departmentId
        );
        if (selectedDepartment) {
          this.employeeData.departmentName = selectedDepartment.departmentName;
        }

        console.log(this.employeeData);

        this.employeeService.createEmployee(this.employeeData).subscribe({
          next: (data) => {
            console.log('Employee created');
            this.showAlert = true;
            this.router.navigateByUrl('/employee');
          },
          error: (error) => {
            console.log('Error in creating employee');
          },
        });
      } else {
        // Editing existing employee
        const selectedDepartment = this.departments.find(
          (department: any) =>
            department.departmentId == this.employeeData.departmentId
        );
        if (selectedDepartment) {
          this.employeeData.departmentName = selectedDepartment.departmentName;
        }

        this.employeeService
          .updateEmployee(this.employeeData.employeeId, this.employeeData)
          .subscribe({
            next: (data) => {
              console.log('Employee updated successfully');
              this.showEditAlert = true;
              this.router.navigateByUrl('/employee');
            },
            error: (error) => {
              console.log('Error in updating employee details');
            },
          });
      }
    }
  }
}
