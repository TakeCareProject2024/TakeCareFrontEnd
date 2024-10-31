import { Component } from '@angular/core';
import { Request } from '../models/Request';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent {
  isAdmin=false;
  
  constructor(private requestService: ApiService) {
    this.requestService.isAdmin$.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });

 
   }
  searchCriteria = {
    name: '',        // Filter by name
    dateAdded: '',   // Filter by date added
    state: ''  ,      // Filter by request status
    order:'created',
    valid:''
  };

  requests:Request[] = [
    {
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
    },{
      id: 2,
      dateRequest: new Date('2024-10-01'),
      dateExecute: new Date('2024-10-15'),
      period: 5,
      state:1,
      evalute:3,
  
      lastName: 'John',
      firstName: 'Doe',
      Phone: "26554444",
      Whatsapp: '1234567890', // WhatsApp number (international format)
      Email: 'john.doe@example.com',
      
      lat: "",
      lang: "",
      address: "dams - midan - bab mosuala"
    },
    {
      id: 2,
      dateRequest: new Date('2024-10-01'),
      dateExecute: new Date('2024-10-15'),
      period: 5,
      state:1,
      evalute:1,
  
      lastName: 'John',
      firstName: 'Doe',
      Phone: "26554444",
      Whatsapp: '1234567890', // WhatsApp number (international format)
      Email: 'john.doe@example.com',
      
      lat: "",
      lang: "",
      address: "dams - midan - bab mosuala"
    }
  ];

  // Function to change request state
  changeState(request:Request, newState:string) {
    const previousState = request.state;
    console.log(newState);
    if(newState=="in")
      request.state = 2;
    else if(newState=="done")
      request.state = 3;
    else
      request.state = 1;

      // Call the service to update the request state in the backend
      /*  
      this.requestService.updateRequest(request).subscribe({
      next: (response) => {
        console.log('Request state updated successfully:', response);
      },
      error: (error) => {
        console.error('Error updating request state:', error);
        // If the request fails, revert to the previous state
        request.state = previousState;
      }
    });*/
  }

  changeValid(request:Request, evalute:number) {
    const previousNumber = request.evalute;
    request.evalute = evalute;

      // Call the service to update the request state in the backend
    /*
      this.requestService.updateRequest(request).subscribe({
      next: (response) => {
        console.log('Request state updated successfully:', response);
      },
      error: (error) => {
        console.error('Error updating request state:', error);
        // If the request fails, revert to the previous state
        request.evalute = evalute;
      }
    });*/
  }

  getBooleanArray(count: number): boolean[] {
    return Array(count).fill(true);
  }

  onSearch() {
    // Call service to search requests by the given criteria
    this.requestService.getRequest(this.searchCriteria).subscribe({
      next: (response) => {
        this.requests = response; // Update the request list with filtered data
      },
      error: (error) => {
        console.error('Error fetching search results:', error);
      }
    });
  }


  stars: number[] = [1, 2, 3, 4, 5]; // Array for 5 stars

}
