import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
import { Employee } from '../models/Employee';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.css']
})


export class AddRequestComponent implements OnInit {
  @Input() employee: any;
  isEditMode = false;
  employeeForm: FormGroup;
  
  imagePreview: string | ArrayBuffer | null = null; // To store the preview image URL
  selectedFile: File | null = null; // To store the actual image file
  defaultImage= '../assets/defaultimage.jpg'; // Path to your default image
  minDate: string; 
  
  constructor(private fb: FormBuilder, private employeeService: ApiService, public activeModal: NgbActiveModal) { 
    //this.employee = { id:1 , firstName: 'John',lastName:"Doe",age:22,personalPhotos:"",valid:3,position:"cleaner",jobDescription:"employee to clean company ", birthDate:new Date("2002-5-5"),image:"" };

    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],    // Example fields
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      valid: ['', Validators.required],
      image: [null],
      lat:['', Validators.required],
      lang:['', Validators.required],
      imagePath:"../assets/defaultimage.jpg"
    });

    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.isEditMode = !!this.employee;
    this.initForm();

    if(this.employee.imagePath!="")
      this.defaultImage=this.employee.imagePath;
    else
      this.defaultImage="../assets/defaultimage.jpg";

      
    if (this.isEditMode) {
      this.employeeForm.patchValue(this.employee);
    }
  }

 

  initForm(): void {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthdate: ['', Validators.required],
      valid: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
      image: [null, Validators.required],
      lat: ["40.73061", Validators.required],
      lng: ["-73.935242 ", Validators.required],
      imagePath:this.defaultImage
    });
  }
  
  onFileSelected(event: any): void {
    const file = event.target.files[0];

    if (file) {
      this.selectedFile = file;

      // Display the selected image in the image preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result; // Set the preview image to the FileReader result
      };
      reader.readAsDataURL(file); // Convert image to base64 string for preview

      // Set the image value in the form
      this.employeeForm.patchValue({
        image: this.selectedFile
      });
      this.employeeForm.get('image')?.updateValueAndValidity();
    }
  }


  saveEmployee(): void {
    
    if (this.employeeForm.valid) {
      const employeeData: Employee = this.employeeForm.value;

      if (this.employeeForm.valid) {
        // Logic to handle employee save
        console.log(this.employeeForm.value);
      } else  if (this.isEditMode) {
        employeeData.id = this.employee.id;
        //this.employeeService.updateEmployee(employeeData).subscribe(() => this.activeModal.close('edited'));
      } else {
        //this.employeeService.addEmployee(employeeData).subscribe(() => this.activeModal.close('added'));
      }
    }

    /*
      if (this.employeeForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('firstName', this.employeeForm.get('firstName')?.value);
    formData.append('lastName', this.employeeForm.get('lastName')?.value);
    formData.append('birthdate', this.employeeForm.get('birthdate')?.value);
    formData.append('valid', this.employeeForm.get('valid')?.value);

    // Add the image if it's selected
    if (this.selectedFile) {
      formData.append('image', this.selectedFile); // Attach the image file
    }
    */
  }

  closeModal(): void {
    this.activeModal.dismiss();
  }
  
}
