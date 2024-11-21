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
    Address: string;
  
    comments: string;  
  
    Lat: number;
    Lang: number;
    facebookLink: string;
    youtube: string;
    instagramLink: string;

    Profile:string[];
  }


  