import { Component, Input } from '@angular/core';
import { Request } from '../models/Request';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-request-element',
  templateUrl: './request-element.component.html',
  styleUrls: ['./request-element.component.css']
})
export class RequestElementComponent {
 @Input() request:Request;

 stars: number[] = [1, 2, 3, 4, 5]; // Array for 5 stars

 constructor(private requestService: ApiService){
  this.request={
    id:0,
  
    CustomerLastName: '',
    CustomerFirstName: '',
    CustomerPhone: "",
    CustomerEmail: '',

    OrderDate: new Date(),
    start_time: "",
    end_time: "",
    OrderState:"",
    Evalute:0,
    EmployeeNumber:1,
    
    lat: "",
    lang: "",
    address: ""
  };
 }

 // Function to change request state
 changeState(request:Request, newState:string) {
  const previousState = request.OrderDate;
  request.OrderState = newState;

    // Call the service to update the request state in the backend
    this.requestService.updateRequest(request).subscribe({
    next: (response) => {       },
    error: (error) => {request.OrderDate = previousState;}
  });
}

changeValid(request:Request, evalute:number) {
  const previousNumber = request.Evalute;
  request.Evalute = evalute;

    // Call the service to update the request state in the backend
  this.requestService.updateRequest(request).subscribe({
    next: (response) => {},
    error: (error) => {request.Evalute = evalute;}
  });
}
}
