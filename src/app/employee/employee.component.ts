import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Employee } from '../models/Employee';
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


  constructor(private apiService: ApiService,private modalService: NgbModal) { 
/*
    this.employees = [
      { id:1 , firstName: 'John',lastName:"Doe",age:22,personalPhotos:"",valid:3,position:"cleaner",jobDescription:"employee to clean company ", birthDate:new Date("2002-5-5"),image:null ,imagePath:"../assets/aa.png" },
      { id:2 ,firstName: 'John',lastName:"Doe",age:22,personalPhotos:"",valid:3,position:"cleaner",jobDescription:"employee to clean company " , birthDate:new Date("2002-5-5"),image:null,imagePath:"../assets/aa.png"},
      { id:3 , firstName: 'John',lastName:"Doe",age:22,personalPhotos:"",valid:3,position:"cleaner",jobDescription:"employee to clean company " , birthDate:new Date("2002-5-5"),image:null,imagePath:""},
      { id:4 , firstName: 'John',lastName:"Doe",age:22,personalPhotos:"",valid:3,position:"cleaner",jobDescription:"employee to clean company " , birthDate:new Date("2002-5-5"),image:null,imagePath:""},    
    ];*/

  }

  getEmployees(): void {
    this.apiService.getEmployees(this.searchName, this.searchValid).subscribe((data: Employee[]) => {
      this.employees = data;
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
    modalRef.componentInstance.employee = null; // No employee data for add

    modalRef.result.then((result) => {
      if (result) {
        // Handle the new employee data and add to the array
        this.employees.push(result); 
      }
    }).catch((error) => {
      console.log('Add employee modal dismissed');
    });
  }

  openEditEmployeePopup(employee: Employee): void {
    const modalRef = this.modalService.open(AddEditEmployeeComponent, { size: '10px' });
    modalRef.componentInstance.employee = employee; // Pass the employee data for editing

    modalRef.result.then((result) => {
      if (result) {
        // Update the employee data in the array
        const index = this.employees.findIndex(emp => emp.id === employee.id);
        if (index !== -1) {
          this.employees[index] = result; // Replace the updated employee
        }
      }
    }).catch((error) => {
      console.log('Edit employee modal dismissed');
    });
  }

  deleteEmployee(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.apiService.deleteEmployee(id).subscribe(() => {
        this.getEmployees(); // Refresh list after deletion
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
   /*
   this.apiService.getMainInfo().subscribe(
     (data) => {
       this.generalInfo = data;
     },
     (error) => {
       console.error('Error fetching general info', error);
     }
   );*/
 }
 
}
