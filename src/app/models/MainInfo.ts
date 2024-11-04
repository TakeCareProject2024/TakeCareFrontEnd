export interface MainInfoResponse {
  data: MainInfo;
  message: string;
}
export interface MainInfo {
    id: number;
    companyName: string;
    description: string;
    services: string;
    phone1: string;
    phone2: string;
    Email: string;
    address: string;
  
    comments: string;  
  
    lat: string;
    lang: string;
    facebook: string;
    youtube: string;
    instagram: string;

    Profile:string[];
  }


  