import { Component, Input } from '@angular/core';
import { Request } from '../models/Request';

@Component({
  selector: 'app-request-element',
  templateUrl: './request-element.component.html',
  styleUrls: ['./request-element.component.css']
})
export class RequestElementComponent {
 @Input() request:Request;

 stars: number[] = [1, 2, 3, 4, 5]; // Array for 5 stars

 constructor(){
  this.request={
    id: 0,
    dateRequest: new Date('0000-01-01'),
    dateExecute: new Date('0000-01-01'),
    period: 0,
    state:0,
    evalute:0,
  
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

}
