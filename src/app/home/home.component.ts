import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MainInfo } from '../models/MainInfo';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  @Input() generalInfo: MainInfo;
  @Input() services:any[]=[];
  @Input() src:string="";
  @Input() whatsAppLink:string="";
  @Input() customerComments:any[]=[];
  
  constructor(private apiService: ApiService) {

    this.generalInfo= {
      id: 1,
      companyName: "",
      description: "",
      services: "",
      Profile: [],
      comments: "",
      address: "",
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
