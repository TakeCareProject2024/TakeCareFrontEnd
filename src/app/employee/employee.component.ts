import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Employee, EmployeeResponse } from '../models/Employee';
import { AddEditEmployeeComponent } from '../add-edit-employee/add-edit-employee.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})


export class EmployeeComponent  implements OnInit{
  employees: Employee[] = [];
  searchName: string = '';
  searchValid: number = 0;
  isAdmin: boolean= false;
  

  constructor(private apiService: ApiService,private modalService: NgbModal) { 
    this.isAdmin=apiService.getIsAdminFromLocalStorage();
  }

  getEmployees(): void {
    this.apiService.getEmployees(this.searchName, this.searchValid).subscribe((data: EmployeeResponse) => {
      this.employees = data.data;
    });
  }

  onSearch(): void {
    this.getEmployees();
  }

  onSearchByValid(star: number): void { 
    this.searchValid = star;
    this.getEmployees();
  }

  openAddEmployeePopup(): void {
    const modalRef = this.modalService.open(AddEditEmployeeComponent, { size: '10px' });
    //modalRef.componentInstance.employee = null; // No employee data for add

    modalRef.result.then(
      (result) => {
        if (result) {
          this.employees.push(result); 
        }
      },
      (reason) => {
      }
    );
   
  }

  openEditEmployeePopup(employee: Employee): void {
    const modalRef = this.modalService.open(AddEditEmployeeComponent, { size: '10px' });
    modalRef.componentInstance.employee = employee; // Pass the employee data for editing
    
    modalRef.result.then(
      (result) => {
        if(result!=undefined){
          const index = this.employees.findIndex(emp => emp.id === employee.id);
      if (index !== -1) {
        this.employees[index] = result; // Replace the updated employee
      }
        }
      },
      (reason) => {
        
      }
    );

    
  }

  deleteEmployee(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.apiService.deleteEmployee(id).subscribe(() => {
        const index = this.employees.findIndex(emp => emp.id === id);
        if (index !== -1) {
          this.employees.splice(index, 1);; // Replace the updated employee
        }
      });
    }
  }

  getAge(birthdate: Date): number {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

 getBooleanArray(count: number): boolean[] {
    return Array(count).fill(true);
  }

 ngOnInit(): void {
  this.getEmployees();
  }
 
}
