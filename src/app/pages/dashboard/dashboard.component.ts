import { Component, OnInit } from '@angular/core';
import { Employee } from '../../model/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { CardComponent } from "../../shared/card/card.component";

@Component({
  selector: 'app-dashboard',
  imports: [CardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  allEmployees: any = [];

  // Total Employee Count
  totalEmployeeCount: number = 0;

  // Count based on Employee Type
  fullTimeEmployeeCount: number = 0;
  partTimeEmployeeCount: number = 0;
  internEmployeeCount: number = 0;
  contractEmployeeCount: number = 0;

  // Count based on Departments
  technicalDepartmentCount: number = 0;
  nonTechnicalDepartmentCount: number = 0;
  salesDepartmentCount: number = 0;
  marketingDepartmentCount: number = 0;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.getAllEmployees();
    this.calculateDashboardData();
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

  calculateDashboardData() {
    // Total Employee Count
    this.totalEmployeeCount = this.allEmployees.length;
    console.log('Total employees: ' + this.totalEmployeeCount);

    for (let employee of this.allEmployees) {
      // Count based on Employee Types
      if (employee.employeeType == 'Full Time') {
        this.fullTimeEmployeeCount++;
      }

      if (employee.employeeType == 'Part Time') {
        this.partTimeEmployeeCount++;
      }

      if (employee.employeeType == 'Intern') {
        this.internEmployeeCount++;
      }

      if (employee.employeeType == 'Contract') {
        this.contractEmployeeCount++;
      }

      // Count based on Department
      if(employee.departmentName == 'Technical') {
        this.technicalDepartmentCount++;
      }

      if(employee.departmentName == 'Non Technical') {
        this.nonTechnicalDepartmentCount++;
      }

      if(employee.departmentName == 'Sales') {
        this.salesDepartmentCount++;
      }

      if(employee.departmentName == 'Marketing') {
        this.marketingDepartmentCount++;
      }
    }
    console.log('Full time employee count: ' + this.fullTimeEmployeeCount);
    console.log('Part time employee count: ' + this.partTimeEmployeeCount);
    console.log('Contract employee count: ' + this.contractEmployeeCount);
    console.log('Intern employee count: ' + this.internEmployeeCount);
    console.log('Technical count: ' + this.technicalDepartmentCount);
    console.log('Non Technical count: ' + this.nonTechnicalDepartmentCount);
    console.log('Sales count: ' + this.salesDepartmentCount);
    console.log('Marketing count: ' + this.marketingDepartmentCount);
  }
}
