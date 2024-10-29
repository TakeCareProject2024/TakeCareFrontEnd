import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent {
  isAdmin = true;
  newPassword="";
  oldPassword="";
  confirmPassword="";
  showEditModal = false;
  showPasswordModal = false;


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

  constructor(private router: Router) {}


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
    this.isAdmin = false;
    this.router.navigate(['/home']);
  }
  
  
}
