import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MainInfo } from '../models/MainInfo';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  comments:string[]= ["John Doe,Amazing Service,We had a great experience with this company. Their customer service was top-notch and the product exceeded our expectations!", 
    "Jane Smith,Highly Recommend,I am beyond impressed with the quality and speed of their service. Definitely will be coming back for more!",
    "Michael Johnson,Exceptional Experience,The team went above and beyond to ensure we were happy with everything. Great attention to detail and fantastic communication."];

  description:string= "your trusted partner for residential and commercial cleaninig services";
  
  constructor(private apiService: ApiService) {

    this.generalInfo= {
      id: 1,
      name: "",
      description: "",
      ourVession: "",
      ourServices: [],
      Profile: [],
      comments: [],
      address: "",
      lat: "",
      lang: "",
      facebook: "",
      instagram: "",
      Whatsapp: "",
      Email: "",
      youtube: '',
      Phone: ''
    };

   }

   @Input() generalInfo: MainInfo;
   @Input() services:any[]=[];
   //@Input() customerComments:any[]=[];
   customerComments:any[]=[];
   @Input() src:string="";
   @Input() whatsAppLink:string="";
  
   ngOnInit(): void {
    this.comments.forEach(element => {
      var servecisInfo =element.split(",");
  
      this.customerComments.push
        ({
          name:servecisInfo[0],
          title: servecisInfo[1],
          description: servecisInfo[2]
        })
    });
  
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
