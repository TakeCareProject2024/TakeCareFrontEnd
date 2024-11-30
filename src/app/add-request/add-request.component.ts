import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
import { Employee } from '../models/Employee';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../services/api.service';
import { formatDate } from '@angular/common';
import { Request } from '../models/Request';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.css']
})


export class AddRequestComponent implements OnInit {
  requestForm: FormGroup;
  @Input() Lat!: number;
  @Input() Lang!: number;

  imagePreview: string | ArrayBuffer | null = null; // To store the preview image URL
  selectedFile: File | null = null; // To store the actual image file
  defaultImage= '../assets/defaultimage.jpg'; // Path to your default image
  minDate: string; 
  msgResponse: string = '';
  msgClass: string = '';
  
  constructor(private fb: FormBuilder, private employeeService: ApiService, 
    public activeModal: NgbActiveModal,
    private datePipe: DatePipe,
    private translate: TranslateService) { 
    //this.employee = { id:1 , firstName: 'John',lastName:"Doe",age:22,personalPhotos:"",valid:3,position:"cleaner",jobDescription:"employee to clean company ", birthDate:new Date("2002-5-5"),image:"" };
    this.Lat=2.48723641360933;
    this.Lang=54.37462243953436;

    var tempNum=Number(localStorage.getItem("Lat"));
    if(tempNum!=undefined)
      this.Lat=tempNum;
    
    tempNum=Number(localStorage.getItem("Lang"));
    if(tempNum!=undefined)
      this.Lang=tempNum;
    
    this.requestForm = this.fb.group({
      CustomerFirstName: ['', Validators.required],
      CustomerLastName: ['', Validators.required],
      OrderDate: [formatDate(new Date(), 'yyyy-MM-dd', 'en'), Validators.required],
      
      end_time: [''],
      start_time: [''],
      
      hoursStart:[12, Validators.required],
      ampmStart:['PM', Validators.required],
      
      Hours:[3, Validators.required],
      
      //CustomerEmail:['',Validators.required],
      CustomerPhone:['00975',Validators.required],

      EmployeeNumber:[3,Validators.required],
      Address:['',Validators.required],
      OrderState:['pending'],
      Evalute: [3],
      
      image: [null],
      Lat: [this.Lat],
      Lang: [this.Lang],
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
      end_time: [''],
      start_time: [''],

      //CustomerEmail:[this.getFromStorage('CustomerEmail'),Validators.required],
      hoursStart:[12, Validators.required],
      ampmStart:['PM', Validators.required],      
      Hours:[3, Validators.required],
      
      CustomerPhone:['00975',Validators.required],

      EmployeeNumber:[3,Validators.required],
      Address:['',Validators.required],
      OrderState:['pending'],
      Evalute: [3],
      
      image: [null],
      Lat: [this.Lat],
      Lang: [this.Lang],
      imagePath:this.defaultImage
    });
  }

  convertAndAddHours(dateStr:string, time: string,period: string, hoursToAdd: number): string {
    
    // Adjust for AM/PM
    let hour = parseInt(time, 10);
    if (period.toLowerCase() === 'pm' && hour !== 12) {
        hour += 12;
      } else if (period.toLowerCase() === 'am' && hour === 12) {
        hour = 0; // Midnight case
      }
  
    // Create a Date object for today with the given hour
    hour=hour+hoursToAdd;
    var date=new Date(dateStr);
    date.setHours(hour, 0, 0, 0); // Set hours, minutes, seconds, milliseconds

    var res= this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss');
    
    if(res==null) return '';
    return res;
  }  
 
  
  saveRequest(): void {
    debugger;
    const newRequets: Request = this.requestForm.value;
    newRequets.start_time =this.convertAndAddHours(this.requestForm.value.OrderDate,this.requestForm.value.hoursStart,this.requestForm.value.ampmStart,0);
    newRequets.end_time = this.convertAndAddHours(this.requestForm.value.OrderDate,this.requestForm.value.hoursStart,this.requestForm.value.ampmStart,this.requestForm.value.Hours); 
    
    if(this.requestForm.value.end_time<=this.requestForm.value.start_time){
      this.msgResponse = this.translate.instant('endSmallStart');
      this.msgClass = 'text-danger';
      setTimeout(() => {
        this.msgResponse = '';
      this.msgClass = '';
      }, 2000);
    }
    else if (this.requestForm.valid) {
      this.employeeService.addRequest(newRequets).subscribe((result) =>{
        if(result){
          this.msgResponse = this.translate.instant('saved');
          this.msgClass = 'text-success'; // apply success styling
          setTimeout(()=>this.closeModal(newRequets),2000);
        }
        else{
          this.msgResponse =this.translate.instant('FaildTry');
          this.msgClass = 'text-danger'; 
        }
      });
    }else{
      this.requestForm.markAllAsTouched();
    }

    this.setStorage('CustomerPhone',this.requestForm.value.CustomerPhone);
    //this.setStorage('CustomerEmail',this.requestForm.value.CustomerEmail);
    this.setStorage('CustomerLastName',this.requestForm.value.CustomerLastName);
    this.setStorage('CustomerFirstName',this.requestForm.value.CustomerFirstName);
    
  }

  closeModal(newRequets:Request|null): void {
    this.activeModal.close(newRequets);
    this.msgResponse = '';
    this.msgClass = ''; 
  }
  
}
