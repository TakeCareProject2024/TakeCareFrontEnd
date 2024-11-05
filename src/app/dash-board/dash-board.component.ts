import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { MainInfo } from '../models/MainInfo';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})

export class DashBoardComponent implements OnInit {
  generalInfo!: MainInfo;
  newPassword="";
  oldPassword="";
  confirmPassword="";
  showEditModal = false;
  showPasswordModal = false;
  isAdmin: boolean= false;
  msgResponse: string = '';
  msgClass: string = '';

  constructor(private router: Router,private apiService: ApiService) {
    this.isAdmin=apiService.getIsAdminFromLocalStorage();
    if(!this.isAdmin){
      const password = prompt("Please enter the admin password:");
      if(password!=null){
        var result=this.apiService.checkPassword(password);
        
        if(!result){
          alert("error password");
          window.location.assign('/');
        }else{
          this.isAdmin=true;
          window.location.reload();
        }
          
      }
    }
  }

  ngOnInit(){
    this.apiService.data$.subscribe(data => {
      this.generalInfo = data;
    });
  }

  saveChanges() {
     this.apiService.updateMainInfo(this.generalInfo).subscribe((isValid) => {
      if (isValid.message=="Company updated successfully.") {
        
        //alert(isValid.message);
        this.generalInfo=isValid.data;
        this.apiService.setData(isValid.data);
        this.msgResponse = 'Changes saved successfully!';
        this.msgClass = 'text-success'; // apply success styling
        this.closeModal(); // close modal if successful

      } else {
        this.msgResponse = 'Failed to save changes. Please try again.';
        this.msgClass = 'text-danger'; 
      }
    });
  }
  
  logout() {
    this.apiService.setIsAdmin(false);
    window.location.assign('/');
  } 

  closeModal() {
    setTimeout(() => {
      const closeModalButton = document.querySelector('[data-bs-dismiss="modal"]') as HTMLElement;
      if (closeModalButton) closeModalButton.click();
    }, 2000); // optional delay before closing
  }
  //---------------------------------------------
  submitPassword() {
    
    /*this.authService.pass(this.password).subscribe((isValid) => {
      if (isValid) {
        // Close the prompt if the password is valid
        console.log('Password valid. Access granted.');
      } else {
        alert('Incorrect password. Please try again.');
      }
    });*/
  }

  changePassword() {
    if (this.newPassword !== this.confirmPassword) {
      alert('New password and confirmation do not match!');
    } else {
      // Perform password change logic here
      console.log('Password changed successfully!');
    }
  }
}
