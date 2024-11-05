// add-edit-employee.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
import { Employee } from '../models/Employee';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html'
})
export class AddEditEmployeeComponent implements OnInit {
  @Input() employee: any;
  isEditMode = false;
  employeeForm: FormGroup;
  
  imagePreview: string | ArrayBuffer | null = null; // To store the preview image URL
  selectedFile: File | null = null; // To store the actual image file
  defaultImage= '../assets/defaultimage.jpg'; // Path to your default image
  msgResponse: string = '';
  msgClass: string = '';

  constructor(private fb: FormBuilder, private employeeService: ApiService, public activeModal: NgbActiveModal) { 
    //this.employee = { id:1 , firstName: 'John',lastName:"Doe",age:22,personalPhotos:"",valid:3,position:"cleaner",jobDescription:"employee to clean company ", birthDate:new Date("2002-5-5"),image:"" };

    this.employeeForm = this.fb.group({
      FirstName: ['', Validators.required],    // Example fields
      LastName: ['', Validators.required],
      age: ['', Validators.required],
      Evalute: ['', Validators.required],
      StartWork: ['', Validators.required],
      image: [null],
      imagePath:"../assets/defaultimage.jpg"
    });
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
      FirstName: ['', Validators.required],    // Example fields
      LastName: ['', Validators.required],
      age: ['', Validators.required],
      Evalute:[1, [Validators.required, Validators.min(1), Validators.max(5)]],
      StartWork: ['', Validators.required],
      image: [null, Validators.required],
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
        employeeData.id = this.employee.id;
        this.employeeService.updateEmployee(employeeData).subscribe((rs) => {
          if(rs){
            this.activeModal.close('employeeModal');
            this.msgResponse = 'Changes saved successfully!';
        this.msgClass = 'text-success'; // apply success styling
        
          }else{
            this.msgResponse = 'Failed to save changes. Please try again.';
            this.msgClass = 'text-danger'; 
          }
            
          
        });
      } else {
        this.msgResponse = 'not valid';
        this.msgClass = 'text-danger'; 
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
