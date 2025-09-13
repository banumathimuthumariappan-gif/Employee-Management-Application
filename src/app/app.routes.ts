import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { EmployeeDetailComponent } from './pages/employee-detail/employee-detail.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NewEmployeeComponent } from './pages/new-employee/new-employee.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'employee',
                component: EmployeeComponent,
            },
            {
                path: 'new-employee',
                component: NewEmployeeComponent
            },
            {
                path: 'display-employee',
                component: EmployeeDetailComponent
            }
        ]
    },
    {
        path: '**', // Wild Card route
        component: NotFoundComponent
    }
];
