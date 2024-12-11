// add-edit-employee.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
import { Employee } from '../models/Employee';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ApiService } from '../services/api.service';
import { formatDate } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(private fb: FormBuilder, private employeeService: ApiService, public activeModal: NgbActiveModal,
    private translate: TranslateService  ) { 
    
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
    this.imagePreview=this.employee.imagePreview;

    if(this.employee!=undefined &&  this.employee.EmployeeImage!=undefined && this.employee.EmployeeImage!="")
      this.defaultImage=this.employee.EmployeeImage;
    else if(this.employee.imagePreview==undefined && this.employee.imagePreview=="")
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
      debugger;
      //set Date
      const formData = new FormData();
      const employeeData: Employee = this.employeeForm.value;
      formData.append('FirstName', employeeData.FirstName);
      formData.append('LastName', employeeData.LastName);
      formData.append('age', employeeData.age.toString());
      formData.append('Evalute', employeeData.Evalute.toString());
      formData.append('StartWork', employeeData.StartWork.toString());
      
      var imageFile= this.employeeForm.get('image')?.value;
      if (imageFile!=undefined) {
        formData.append('EmployeeImage',imageFile);
        employeeData.EmployeeImage="";
      }else if(employeeData.EmployeeImage!=this.defaultImage){
        formData.append('EmployeeImage', employeeData.EmployeeImage.toString());
      }

      if (employeeData.id!=undefined) {
      
        formData.append('id', employeeData.id.toString());
        this.employeeService.updateEmployee(formData,employeeData.id).subscribe((result) => {
          if(result.message=="Employee updated successfully"){
            this.msgResponse = this.translate.instant('saved');
            this.msgClass = 'text-success'; // apply success styling
            this.employeeForm.value.EmployeeImage=result.data.EmployeeImage;
            
            setTimeout(()=>this.closeModal(this.employeeForm.value),2000);
          }else{
            this.msgResponse = this.translate.instant('FaildTry');
            this.msgClass = 'text-danger'; 
          } });
      } else {

        this.employeeService.addEmployee(formData).subscribe((result) => {
          if(result.message=="Employee created successfully"){
            this.msgResponse = 'saved';
            this.msgClass = 'text-success'; // apply success styling
            this.employeeForm.value.id=result.data.id;
            this.employeeForm.value.EmployeeImage=result.data.EmployeeImage;
            if(this.imagePreview!=''){
              this.employeeForm.value.imagePreview= this.imagePreview ;
              //this.employeeForm.value.EmployeeImage= '';            
            }
            setTimeout(()=>this.closeModal(this.employeeForm.value),2000);
          }
          else{
            this.msgResponse =  this.translate.instant('FaildTry');
            this.msgClass = 'text-danger'; 
          } });
      }
    }else{
      this.employeeForm.markAllAsTouched();
    }
  }

  closeModal(employee:Employee): void {
    this.activeModal.close(employee);
    this.msgResponse = '';
    this.msgClass = '';
  }


  ///---------------------------------------------------
  maxSize = 2 * 1024 * 1024; // 2MB

  onImageSelect(event: Event): void {
    debugger;
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.resizeImage(file, 800, 800, 0.8).then((resizedImage) => {
        if (this.checkFileSize(resizedImage)) {
          this.imagePreview = resizedImage; // Show resized image
          this.uploadImage(resizedImage); // Send to backend
        } else {
          console.error('Image exceeds 2MB after resizing. Adjusting quality...');
          this.reduceImageQuality(resizedImage).then((compressedImage) => {
            this.imagePreview = compressedImage;
            this.uploadImage(compressedImage);
          });
        }
      });
    }
  }

  resizeImage(
    file: File,maxWidth: number,
    maxHeight: number,quality: number
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target?.result) {
          img.src = event.target.result as string;
        }
      };

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject('Canvas not supported');
          return;
        }

        // Calculate dimensions
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Draw resized image on canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to Base64 string with compression
        resolve(canvas.toDataURL('image/jpeg', quality));
      };

      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  checkFileSize(base64String: string): boolean {
    const byteString = atob(base64String.split(',')[1]);
    return byteString.length <= this.maxSize;
  }

  reduceImageQuality(base64String: string): Promise<string> {
    const qualityStep = 0.1; // Reduce quality in steps
    const maxAttempts = 5;

    return new Promise((resolve, reject) => {
      let attempts = 0;

      const tryCompress = (currentQuality: number) => {
        const img = new Image();
        img.src = base64String;

        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            reject('Canvas not supported');
            return;
          }

          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          const compressedBase64 = canvas.toDataURL('image/jpeg', currentQuality);

          if (this.checkFileSize(compressedBase64)) {
            resolve(compressedBase64);
          } else if (attempts < maxAttempts) {
            attempts++;
            tryCompress(currentQuality - qualityStep);
          } else {
            reject('Unable to compress image below 2MB');
          }
        };
      };

      tryCompress(0.8); // Start with initial quality
    });
  }

  uploadImage(imageBase64: string): void {

    //reader.readAsDataURL(file); // Convert image to base64 string for preview
    const blob = this.dataURLToBlob(imageBase64);

    this.employeeForm.patchValue({ image: blob, imagePreview: imageBase64});
    this.employeeForm.get('image')?.updateValueAndValidity();
    //const formData = new FormData();
    //formData.append('file', blob, 'resized-image.jpg');

  }

  dataURLToBlob(dataURL: string): Blob {
    const parts = dataURL.split(',');
    const mime = parts[0].match(/:(.*?);/)?.[1];
    const bstr = atob(parts[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
  }
  ///---------------------------------------------------
  
}
