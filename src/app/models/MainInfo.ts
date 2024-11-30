export interface MainInfoResponse {
  data: MainInfo;
  message: string;
}
export interface MainInfo {
    id: number;
    companyName: string;
    description: string;
    Arabicdescription:string,
    services: string;
    Arabicservices: string;
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


  