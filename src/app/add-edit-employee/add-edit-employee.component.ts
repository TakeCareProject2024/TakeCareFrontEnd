// add-edit-employee.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
import { Employee } from '../models/Employee';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ApiService } from '../services/api.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html'
})
export class AddEditEmployeeComponent implements OnInit {
  @Input() employee: any;
  isEditMode = false;
  employeeForm: FormGroup;
  
  currentdate = new Date(); 
  datetime:string = "";

  imagePreview: string | ArrayBuffer | null = null; // To store the preview image URL
  selectedFile: File | null = null; // To store the actual image file
  defaultImage= '../assets/defaultimage.jpg'; // Path to your default image
  msgResponse: string = '';
  msgClass: string = '';

  constructor(private fb: FormBuilder, private employeeService: ApiService, public activeModal: NgbActiveModal) { 
    
    this.employeeForm = this.fb.group({
      id:[undefined],
      FirstName: ['', Validators.required],    // Example fields
      LastName: ['', Validators.required],
      age: [18, Validators.required],
      Evalute: [3, Validators.required],
      StartWork: [formatDate(this.currentdate, 'yyyy-MM-dd', 'en'), Validators.required],

      image: [null],
      imagePreview:[""],
      EmployeeImage:"../assets/defaultimage.jpg"
    });
  }

  ngOnInit(): void {
    this.isEditMode = !!this.employee;
    this.initForm();

    if(this.employee!=undefined &&  this.employee.EmployeeImage!=undefined)
      this.defaultImage=this.employee.EmployeeImage;
    else
      this.defaultImage="../assets/defaultimage.jpg";

      
    if (this.isEditMode) {
      this.employeeForm.patchValue(this.employee);
    }
  }

  initForm(): void {
    this.employeeForm = this.fb.group({
      id:[undefined],
      FirstName: ['', Validators.required],    // Example fields
      LastName: ['', Validators.required],
      age: [18, Validators.required],
      Evalute:[3, [Validators.required, Validators.min(1), Validators.max(5)]],
      StartWork: [formatDate(this.currentdate, 'yyyy-MM-dd', 'en'), Validators.required],
      image:  [null],
      imagePreview:[""],
      EmployeeImage:this.defaultImage
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
      this.employeeForm.patchValue({ image: file });
      this.employeeForm.get('image')?.updateValueAndValidity();
    }
  }


  saveEmployee(): void {
  
    if (this.employeeForm.valid) {
     
      //set Date
      const formData = new FormData();
      const employeeData: Employee = this.employeeForm.value;
      formData.append('FirstName', employeeData.FirstName);
      formData.append('LastName', employeeData.LastName);
      formData.append('age', employeeData.age.toString());
      formData.append('Evalute', employeeData.Evalute.toString());
      
      formData.append('StartWork', employeeData.StartWork.toString());
      formData.append('EmployeeImage', employeeData.EmployeeImage.toString());

      var imageFile= this.employeeForm.get('image')?.value;
      if (imageFile!=undefined) {
        formData.append('EmployeeImage',imageFile);
      }

      if (employeeData.id!=undefined) {
      
        formData.append('id', employeeData.id.toString());
        this.employeeService.updateEmployee(formData,employeeData.id).subscribe((result) => {
          if(result){
            this.msgResponse = 'Changes saved successfully!';
            this.msgClass = 'text-success'; // apply success styling
            setTimeout(()=>this.closeModal(this.employeeForm.value),2000);
          }else{
            this.msgResponse = 'Failed to save changes. Please try again.';
            this.msgClass = 'text-danger'; 
          } });
      } else {

        this.employeeService.addEmployee(formData).subscribe((result) => {
          if(result){
            this.msgResponse = 'saved successfully!';
            this.msgClass = 'text-success'; // apply success styling
            debugger;
            if(this.imagePreview!=''){
              this.employeeForm.value.imagePreview= this.imagePreview ;
              this.employeeForm.value.EmployeeImage= '';            
            }
            setTimeout(()=>this.closeModal(this.employeeForm.value),2000);
          }
          else{
            this.msgResponse = 'Failed to save changes. Please try again.';
            this.msgClass = 'text-danger'; 
          } });
      }
    }else{
      this.employeeForm.markAllAsTouched();
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

  closeModal(employee:Employee): void {
    this.activeModal.close(employee);
    this.msgResponse = '';
    this.msgClass = '';
  }
  
}
