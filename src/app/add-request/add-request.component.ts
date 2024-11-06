import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
import { Employee } from '../models/Employee';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../services/api.service';
import { formatDate } from '@angular/common';
import { Request } from '../models/Request';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.css']
})


export class AddRequestComponent implements OnInit {
  requestForm: FormGroup;
  
  imagePreview: string | ArrayBuffer | null = null; // To store the preview image URL
  selectedFile: File | null = null; // To store the actual image file
  defaultImage= '../assets/defaultimage.jpg'; // Path to your default image
  minDate: string; 
  msgResponse: string = '';
  msgClass: string = '';
  
  constructor(private fb: FormBuilder, private employeeService: ApiService, 
    public activeModal: NgbActiveModal,
    private datePipe: DatePipe) { 
    //this.employee = { id:1 , firstName: 'John',lastName:"Doe",age:22,personalPhotos:"",valid:3,position:"cleaner",jobDescription:"employee to clean company ", birthDate:new Date("2002-5-5"),image:"" };

    this.requestForm = this.fb.group({
      CustomerFirstName: ['', Validators.required],
      CustomerLastName: ['', Validators.required],
      OrderDate: [formatDate(new Date(), 'yyyy-MM-dd', 'en'), Validators.required],
      end_time: ['', Validators.required],
      start_time: ['', Validators.required],
      CustomerEmail:['',Validators.required],
      CustomerPhone:['',Validators.required],

      EmployeeNumber:[3,Validators.required],
      OrderState:['pending'],
      Evalute: [3],
      
      image: [null],
      lat: ["40.73061"],
      lng: ["-73.935242 "],
      imagePath:this.defaultImage
    });

    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.initForm();
  }

  formatDateForAPI(datestr:Date, dateString: string): string {
    const [hours, minutes] = dateString.split(':').map(Number);
    var date=new Date(datestr);
    date.setHours(hours, minutes, 0);
    var res= this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss');
    
    if(res==null) return '';
    return res;
  } 
  public getFromStorage(key:string): string {
    var value=localStorage.getItem(key);
    if(value==undefined)
      return '';
    return value;
  }

  setStorage(key :string,value: string): void {
    localStorage.setItem(key, value.toString());
  }
  initForm(): void {
    
    this.requestForm = this.fb.group({
      CustomerFirstName: [this.getFromStorage('CustomerFirstName'), Validators.required],
      CustomerLastName: [this.getFromStorage('CustomerLastName'), Validators.required],
      OrderDate: [formatDate(new Date(), 'yyyy-MM-dd', 'en'), Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
      CustomerEmail:[this.getFromStorage('CustomerEmail'),Validators.required],
      CustomerPhone:[this.getFromStorage('CustomerPhone'),Validators.required],
      EmployeeNumber:[3,Validators.required],
      OrderState:['pending'],
      Evalute: [3],
      
      image: [null],
      lat: ["40.73061"],
      lng: ["-73.935242 "],
      imagePath:this.defaultImage
    });
  }
 
  saveRequest(): void {
    
    const newRequets: Request = this.requestForm.value;
    this.setStorage('CustomerPhone',this.requestForm.value.CustomerPhone);
    this.setStorage('CustomerEmail',this.requestForm.value.CustomerEmail);
    this.setStorage('CustomerLastName',this.requestForm.value.CustomerLastName);
    this.setStorage('CustomerFirstName',this.requestForm.value.CustomerFirstName);
    
    newRequets.start_time = this.formatDateForAPI(newRequets.OrderDate,newRequets.start_time); 
    newRequets.end_time = this.formatDateForAPI(newRequets.OrderDate,newRequets.end_time); 
    
    if (this.requestForm.valid) {
      this.employeeService.addRequest(newRequets).subscribe((result) =>{
        if(result){
          this.msgResponse = 'saved successfully!';
          this.msgClass = 'text-success'; // apply success styling
          setTimeout(()=>this.closeModal(newRequets),2000);
        }
        else{
          this.msgResponse = 'Failed to save changes. Please try again.';
          this.msgClass = 'text-danger'; 
        }
      });
    }else{
      this.requestForm.markAllAsTouched();
    }
  }

  closeModal(newRequets:Request|null): void {
    this.activeModal.close(newRequets);
    this.msgResponse = '';
    this.msgClass = ''; 
  }
  
}
