import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { MainInfo } from '../models/MainInfo';
import { TranslateService } from '@ngx-translate/core';

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
  mapInfo:any;

  customerComments:any[]=[{name:"",description:""},{name:"",description:""},{name:"",description:""}  ];
  services:any[]=[{title:"",description:""},{title:"",description:""},{title:"",description:""},
                  {title:"",description:""},{title:"",description:""},{title:"",description:""}];
  
  constructor(private router: Router,private apiService: ApiService,private translate: TranslateService) {
    
  }

  ngOnInit(){
    this.apiService.data$.subscribe(data => {
      this.generalInfo = data;
    
      this.isAdmin=this.apiService.getIsAdminFromLocalStorage();
        
    if(!this.isAdmin){
      const password = prompt("Please enter the admin password:");
      if(password!=null){
        var dataLog={password:password,Email:this.generalInfo.Email};
        var result=this.apiService.checkPassword(dataLog);
        debugger;
        
        if(!result){
          alert("error password");
          this.apiService.setIsAdmin(false);
          window.location.assign('/');
        }else{
          this.isAdmin=true;
          this.apiService.setIsAdmin(true);
          window.location.reload();
        }
          
      }
    }
       //serivces
       if(this.generalInfo.services!=undefined){
        var servecisList =this.generalInfo.services.split(",");
        var index=0;
        servecisList.forEach(element => {
          var servecisInfo =element.split(":");
          if(servecisInfo.length==2){
            this.services[index]={
              title: servecisInfo[0],
              description: servecisInfo[1]
            };
            index=index+1;
          }
        });          
      }
      
      //comments
      if(this.generalInfo.comments!=undefined){
        var commentsStr =this.generalInfo.comments.split(",");
        var index=0;
        commentsStr.forEach(element => {
          var servecisInfo =element.split(":");

          if(servecisInfo.length==2){
            this.customerComments[index]={
              name:servecisInfo[0],
              description: servecisInfo[1]
            };
            index=index+1;
          }
        });  
      }
      
     this.mapInfo= {Lat:this.generalInfo.Lat,Lang:this.generalInfo.Lang};
    });
  }

  onLatChange(newLat: number): void {
    debugger;
    this.generalInfo.Lat = newLat;
  }

  // Called when the child emits updated longitude
  onLangChange(newLang: number): void {
    this.generalInfo.Lang = newLang;
  }

  saveChanges() {

    //serivces
    this.generalInfo.services="";
    this.services.forEach(element => {
      this.generalInfo.services=this.generalInfo.services+
      element.title+":"+element.description+",";
    });   

    //comments
   this.generalInfo.comments="";
   this.customerComments.forEach(element => {
     this.generalInfo.comments=this.generalInfo.comments+
     element.name+":"+element.description+",";
   });


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

      this.msgResponse = '';
      this.msgClass = ''; 
    }, 1000); // optional delay before closing
  }
  //---------------------------------------------
  

  changePassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.msgResponse= this.translate.instant('msgconfirm');
    } else if (this.newPassword ==   this.oldPassword) {
      this.msgResponse=this.translate.instant('msgeqpass');
    }else {
      var data={
        "Email": this.generalInfo.Email,
        "current_password": this.oldPassword,
        "new_password": this.newPassword,
        "new_password_confirmation": this.confirmPassword
    };

    var result = this.apiService.changePassword(data);
    
    if(result){
      this.msgResponse =  this.translate.instant('saved');
      this.msgClass = 'text-success'; // apply success styling
      
      setTimeout(() => {
        const closeModalButton = document.querySelector('#closeChange') as HTMLElement;
        if (closeModalButton) closeModalButton.click();
  
      }, 1000);

    }else{
      this.msgResponse = 'Failed to save changes. Please try again.';
      this.msgClass = 'text-danger'; 

      setTimeout(() => {
        const closeModalButton = document.querySelector('#closeChange') as HTMLElement;
        if (closeModalButton) closeModalButton.click();
      }, 1000);
    }

    setTimeout(() => {
      this.msgResponse = '';
      this.msgClass = ''; 
    }, 1000);

  }
  }
}
