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
  services:any[]=[];
  whatsAppLink:string="";
  customerComments:any[]=[];
  @Input() src:string="";
  
  ngOnInit(){

    this.apiService.data$.subscribe(data => {
      this.generalInfo = data;
    });

      //serivces
      if(this.generalInfo.services!=undefined){
        var servecisList =this.generalInfo.services.split(",");
        servecisList.forEach(element => {
          var servecisInfo =element.split(":");

          if(servecisInfo.length==2){
            this.services.push
            ({
              title: servecisInfo[0],
              description: servecisInfo[1]
            });
          }
        });          
      }
      
      //comments
      if(this.generalInfo.comments!=undefined){
        var commentsStr =this.generalInfo.comments.split(",");
        commentsStr.forEach(element => {
          var servecisInfo =element.split(":");

          if(servecisInfo.length==3){
            this.customerComments.push
            ({
              name:servecisInfo[0],
              title: servecisInfo[1],
              description: servecisInfo[2]
            });
          }
        });  
      }
      
      //whtasapp
      this.whatsAppLink="https://wa.me/"+this.generalInfo.phone1+"?text=مرحبا, أود الاستفسار عن خدمات التنظيف لديكم"
      //this.src="https://www.google.com/maps/embed/v1/view?key=AIzaSyBnmKPsTtY_JF3N74MIBVq5xg62P97tt_g&center="+this.generalInfo.lang+", "+this.generalInfo.lang+"&zoom=16";    
    
  }
  constructor(private apiService: ApiService) {

    this.generalInfo= {
      id: 1,
      companyName: "",
      description: "",
      services: "",
      Profile: [],
      comments: "",
      Address: "",
      lat: "",
      lang: "",
      facebook: "",
      instagram: "",
      phone1: "",
      Email: "",
      youtube: '',
      phone2: ''
    };
   }
  
}
