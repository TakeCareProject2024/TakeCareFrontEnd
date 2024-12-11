export interface RequestResponse {
  data: Request[];
  message: string;
  
}

export interface RequestResponseAdd {
  data: Request;
  message: string;
  
}


export interface Request {

    id: number;
    CustomerFirstName: string;
    CustomerLastName: string;
    CustomerPhone: string;
    CustomerEmail: string;

    OrderDate: Date;
    start_time: string;
    end_time: string;

    EmployeeNumber: number;
    Evalute:number;
    OrderState: string;

   
    
    Lat: number;
    Lang: number;
    Address: string;
    
  }