import { Component, OnInit } from '@angular/core';
import { Employee } from '../../model/employee.model';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-employee-detail',
  imports: [DatePipe],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.css',
})
export class EmployeeDetailComponent implements OnInit {
  currentEmployee: Employee = {
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

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.getEmployeeId();
  }

  getEmployeeId() {
    this.route.queryParams.subscribe((params) => {
      const empId = params['id'];
      console.log(empId);

      this.getEmployeeData(+empId);
    });
  }

  getEmployeeData(id: number) {
    this.employeeService.getEmployeeById(id).subscribe({
      next: (data) => {
        if (data) {
          this.currentEmployee = { ...data };
        }
      },
      error: (error) => {
        console.log('Error in getting employee detail');
      },
    });
  }
}
