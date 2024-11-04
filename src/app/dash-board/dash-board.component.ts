import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { MainInfo } from '../models/MainInfo';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})

export class DashBoardComponent {
  @Input() generalInfo!: MainInfo;
  newPassword="";
  oldPassword="";
  confirmPassword="";
  showEditModal = false;
  showPasswordModal = false;
  isAdmin: boolean= false;

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

  saveChanges() {
     this.apiService.updateMainInfo(this.generalInfo).subscribe((isValid) => {
      if (isValid.message=="Company updated successfully.") {
        alert(isValid.message);
        this.generalInfo=isValid.data;
      } else {
        alert('Company information not saved');
      }
    });
  }
  
  logout() {
    this.apiService.setIsAdmin(false);
    window.location.assign('/');
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
