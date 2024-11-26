export interface EmployeeResponse {
  data: Employee[];
  message: string;
}

export interface Employee {
    id: number;
    FirstName: string;
    LastName: string;
    age:number;
    EmployeeImage:string;
    Evalute: number;
    StartWork:Date;
    
    personalPhotos: string;
    position: string;
    jobDescription: string;
    image:File | null;
    birthDate:Date;
    imagePreview:string;
    //imagePath:string;
    
    //companyId: number;
    //nationality: string;
    //passportPhotos: string[];
    //passportNumber: string;
    //phone: string;

  }
  