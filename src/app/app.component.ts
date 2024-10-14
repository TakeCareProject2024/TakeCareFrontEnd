import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { MainInfo } from './models/MainInfo';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddRequestComponent } from './add-request/add-request.component';
import { Request } from '../app/models/Request';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cleaner-app';
  request:Request ={
    id: 2,
    dateRequest: new Date('2024-10-01'),
    dateExecute: new Date('2024-10-15'),
    period: 5,
    state:1,
    evalute:5,

    lastName: 'John',
    firstName: 'Doe',
    Phone: "26554444",
    Whatsapp: '1234567890', // WhatsApp number (international format)
    Email: 'john.doe@example.com',
    
    lat: "",
    lang: "",
    address: "dams - midan - bab mosuala"
  };

  constructor(private apiService: ApiService,private modalService: NgbModal) {

    this.generalInfo= {
      id: 1,
      name: "Cleaner",
      description: "your trusted partner for residential and commercial cleaninig services",
      ourVession: "the first Cleaner in Middle East",
      
      ourServices: ["Commercial Cleaning,Keep your workspace clean and healthy with our specialized commercial cleaning services.", 
        "Residential Cleaning,Professional cleaning services for your home including deep cleaning and regular maintenance.",
        "Commercial Cleaning,Keep your workspace clean and healthy with our specialized commercial cleaning services.", 
        "Residential Cleaning,Professional cleaning services for your home including deep cleaning and regular maintenance."
      ],
  
      Profile: ["Commercial Cleaning,Keep your workspace clean and healthy with our specialized commercial cleaning services.", 
        "Residential Cleaning,Professional cleaning services for your home including deep cleaning and regular maintenance.",
        "Commercial Cleaning,Keep your workspace clean and healthy with our specialized commercial cleaning services.", 
        "Residential Cleaning,Professional cleaning services for your home including deep cleaning and regular maintenance."
      ],
      
      comments: ["John Doe,Amazing Service,We had a great experience with this company. Their customer service was top-notch and the product exceeded our expectations!", 
        "Jane Smith,Highly Recommend,I am beyond impressed with the quality and speed of their service. Definitely will be coming back for more!",
        "Michael Johnson,Exceptional Experience,The team went above and beyond to ensure we were happy with everything. Great attention to detail and fantastic communication."],
  
      address: "Abu Dhabi",
      lat: "24.48723641360933",
      lang: "54.37462243953436",
      facebook: "",
      instagram: "",
      Whatsapp: "963930748645",
      Email: "email@info.com",
      
      youtube: '',
      Phone: ''
    };

    this.generalInfo.ourServices.forEach(element => {
      var servecisInfo =element.split(",");

      this.services.push
        ({
          title: servecisInfo[0],
          description: servecisInfo[1]
        })
    });

    this.generalInfo.comments.forEach(element => {
      console.log(element);
      var servecisInfo =element.split(",");

      this.customerComments.push
        ({
          name:servecisInfo[0],
          title: servecisInfo[1],
          description: servecisInfo[2]
        })
    });

    this.whatsAppLink="https://wa.me/"+this.generalInfo.Whatsapp+"?text=مرحبا, أود الاستفسار عن خدمات التنظيف لديكم"
    //this.src="https://www.google.com/maps/embed/v1/view?key=AIzaSyBnmKPsTtY_JF3N74MIBVq5xg62P97tt_g&center="+this.generalInfo.lang+", "+this.generalInfo.lang+"&zoom=16";

  }

  openAddRequestPopup(): void {
    const modalRef = this.modalService.open(AddRequestComponent, { size: '10px' });
    modalRef.componentInstance.request = null; // No employee data for add

    modalRef.result.then((result) => {
      if (result) {
        // Handle the new employee data and add to the array
        alert("ok"); 
      }
    }).catch((error) => {
      console.log('Add employee modal dismissed');
    });
  }
  
  generalInfo: MainInfo;
  services:any[]=[];
  customerComments:any[]=[];
  src:string="";
  whatsAppLink:string="";

  images = [
    { src: 'assets/d.png', alt: 'Image 2' },
    { src: 'assets/c.png', alt: 'Image 1' },
    { src: 'assets/e.jpeg', alt: 'Image 3' },
    { src: 'assets/bb.png', alt: 'Image 3' }
  ];
  companyImages = [
    { src: 'assets/c.jpg', alt: 'Image 1' },
    { src: 'assets/d.jpg', alt: 'Image 2' },
    { src: 'assets/e.jpg', alt: 'Image 3' }
  ];

}
