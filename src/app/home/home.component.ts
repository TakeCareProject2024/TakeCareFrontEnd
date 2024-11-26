import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MainInfo } from '../models/MainInfo';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  generalInfo: MainInfo;
  services:any[]=[{title:"",description:""},{title:"",description:""},{title:"",description:""},
    {title:"",description:""},{title:"",description:""},{title:"",description:""},
  ];
  whatsAppLink:string="";
  customerComments:any[]=[{name:"",description:""},{name:"",description:""},{name:"",description:""}];
  @Input() src:string="";
  
  ngOnInit(){

    this.apiService.data$.subscribe(data => {
      this.generalInfo = data;

      //serivces
      var lang=localStorage.getItem('lang'); 
      var services=this.generalInfo.services;
      if(lang!="en")
        services=this.generalInfo.Arabicservices;

      if(services!=undefined){
        var servecisList =services.split(",");
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
      
      //whtasapp
      this.whatsAppLink="https://wa.me/"+this.generalInfo.phone1+"?text=مرحبا, أود الاستفسار عن خدمات التنظيف لديكم"
      //this.src="https://www.google.com/maps/embed/v1/view?key=AIzaSyBnmKPsTtY_JF3N74MIBVq5xg62P97tt_g&center="+this.generalInfo.lang+", "+this.generalInfo.lang+"&zoom=16";    
    
    });

      
  }
  constructor(private apiService: ApiService) {

    this.generalInfo= {
      id: 1,
      companyName: "",
      description: "",
      services: "",
      Arabicservices:"",
      Profile: [],
      comments: "",
      Address: "",
      Lat: 24.48723641360933,
      Lang: 54.37462243953436,
      facebookLink: "",
      instagramLink: "",
      phone1: "",
      Email: "",
      youtube: '',
      phone2: ''
    };
   }
  
}
