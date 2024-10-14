export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    personalPhotos: string;
    valid: number;
    position: string;
    jobDescription: string;
    age:number;
    image:File | null;
    birthDate:Date;
    imagePath:string;
    //startDate:Date;
    //companyId: number;
    //nationality: string;
    //passportPhotos: string[];
    //passportNumber: string;
    //phone: string;
  }
  