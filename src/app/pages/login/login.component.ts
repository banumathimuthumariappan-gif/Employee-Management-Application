import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    let loginDetails = {
      userName: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value,
    };

    this.employeeService
      .login(loginDetails.userName, loginDetails.password)
      .subscribe({
        next: (data) => {
          if (data) {
            this.router.navigateByUrl('dashboard');
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
