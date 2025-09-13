import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Designation, Employee } from '../../model/employee.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  imports: [NgForOf, DatePipe, FormsModule, NgIf],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent implements OnInit {
  showForm: boolean = false;
  allEmployees: any = [];
  searchId: number | string = '';
  showAlert: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllEmployees();
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

  editEmployee(id: number) {
    this.router.navigate(['/new-employee'], { queryParams: { id: id } });
  }

  // Deleteing the employee based on employee id
  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe({
      next: (data) => {
        console.log('Employee deleted successfully');
      },
      error: (error) => {
        console.log('Error in deleting employee');
      },
    });
  }

  displayEmployee(id: number) {
    this.router.navigate(['/display-employee'], { queryParams: { id: id } });
  }
}
