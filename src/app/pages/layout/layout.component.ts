import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {

  allEmployees: any = [];
  searchId: number | string = '';
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

  logout() {
    this.employeeService.logout();
    this.router.navigateByUrl('/login');
  }

  searchEmployee() {
    const searchIdNum = Number(this.searchId);
    const searchEmployee = this.allEmployees.find(
      (employee: any) => employee.employeeId === searchIdNum
    );
    if (searchEmployee) {
      this.router.navigate(['/display-employee'], {
        queryParams: { id: this.searchId },
      });
    } else {
      alert("No employee found!!!");
    }
  }
}
