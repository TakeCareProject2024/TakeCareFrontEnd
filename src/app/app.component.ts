import { Component, OnInit } from '@angular/core';
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

export class AppComponent  implements OnInit{
  
  title = 'cleaner-app';
  isAdmin = false;
  
  generalInfo: MainInfo;
  services:any[]=[];
  customerComments:any[]=[];
  src:string="";
  whatsAppLink:string="";


  ngOnInit(): void {

  }

  constructor(private apiService: ApiService,private modalService: NgbModal) {
  
    this.generalInfo= {
      id: 1,
      companyName: "",
      description: "",     
      comments: "",  
      services: "",
      Address: "",
      phone1: "",
      phone2: "",
      Email: "",      
      
      lat: "24.48723641360933",
      lang: "54.37462243953436",
      facebook: "",
      instagram: "",
      youtube: '',

      Profile: ["Commercial Cleaning,Keep your workspace clean and healthy with our specialized commercial cleaning services.", 
        "Residential Cleaning,Professional cleaning services for your home including deep cleaning and regular maintenance.",
        "Commercial Cleaning,Keep your workspace clean and healthy with our specialized commercial cleaning services.", 
        "Residential Cleaning,Professional cleaning services for your home including deep cleaning and regular maintenance."
      ]
    };

    this.isAdmin=this.apiService.getIsAdminFromLocalStorage();

    this.apiService.getMainInfo().subscribe(
      (data) => {
        this.generalInfo = data.data;
        this.apiService.setData(data.data);      
      },
      (error) => {
        console.error('Error fetching general info', error);
      }
    );
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

  request:Request ={
    id: 2,
    dateRequest: new Date('2024-10-01'),
    dateExecute: new Date('2024-10-15'),
    period: 5,
    state:1,
    evalute:5,

    lastName: '',
    firstName: '',
    Phone: "",
    Whatsapp: '', // WhatsApp number (international format)
    Email: '',
    
    lat: "",
    lang: "",
    address: ""
  };

}
