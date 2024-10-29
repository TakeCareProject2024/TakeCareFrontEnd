import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { EmployeeComponent } from './employee/employee.component';
import { RequestsComponent } from './requests/requests.component';
import { DashBoardComponent } from './dash-board/dash-board.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'employees', component: EmployeeComponent },
  { path: 'requests', component: RequestsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'dashboard', component: DashBoardComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }