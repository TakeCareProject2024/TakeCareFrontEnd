import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent {
  newPassword="";
  oldPassword="";
  confirmPassword="";
  showEditModal = false;
  showPasswordModal = false;
  isAdmin: boolean= false;


  company = {
    name: 'Your Company Name',
    description: 'Description of your company',
    services: 'Services offered',
    comments: 'User comments',
    address: 'Company address',
    phone: '123-456-7890',
    email:'aaa@gmail.com',
    facebookLink: 'https://facebook.com/yourcompany',
    instagramLink: 'https://instagram.com/yourcompany'
  };

  constructor(private router: Router,private apiService: ApiService) {
    
    console.log(this.isAdmin);
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


  changePassword() {
    if (this.newPassword !== this.confirmPassword) {
      alert('New password and confirmation do not match!');
    } else {
      // Perform password change logic here
      console.log('Password changed successfully!');
    }
  }
  

  saveChanges() {
    // Perform the save logic, such as making an API call
    console.log('Company information saved:', this.company);
  }
  

  logout() {
    this.apiService.setIsAdmin(false);
    //window.location.origin
    window.location.assign('/');
    //this.router.navigate(['/home']);
  } 

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
  
  
}
