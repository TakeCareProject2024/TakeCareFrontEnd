// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient ,HttpParams} from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Employee, EmployeeResponse } from '../models/Employee';
import { MainInfo, MainInfoResponse } from '../models/MainInfo';
import { Request, RequestResponse } from  '../models/Request';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  //---------------------------------------------------------
  //maininfo
  private apiUrlMainInfo = 'http://137.184.119.246/api/companies';
  private companyInfo = new BehaviorSubject<any>({});
  data$ = this.companyInfo.asObservable();

  setData(data: any) {
    this.companyInfo.next(data);
  }
  getMainInfo(): Observable<MainInfoResponse> {
    return this.http.get<MainInfoResponse>(this.apiUrlMainInfo+"/1");
  }

  updateMainInfo(mainInfo: MainInfo): Observable<MainInfoResponse> {
    return this.http.put<MainInfoResponse>(`${this.apiUrlMainInfo}/${mainInfo.id}`, mainInfo);
  }

  setIsAdmin(isAdmin: boolean): void {
    localStorage.setItem('isAdmin', isAdmin.toString());
  }

  checkPassword(data: any):  Observable<boolean>  {

    return this.http.post<boolean>(`${this.apiUrlMainInfo}/login`, data, { observe: 'response' }).pipe(
      map((response) => {
        // Map the response to a boolean
        return response.status === 200;
      }),
      catchError((error) => {
        // Handle errors and return false
        console.error('Error in checkPassword:', error);
        return of(false); // Use `of` to return an Observable<boolean>
      })
    );
}

  changePassword(data: any): boolean {
    this.http.patch(`${this.apiUrlMainInfo}/changePassword`, data,{ observe: 'response' }).subscribe(response => {
       if (response.status == 200) {
           return true;
       } else {
           return false;
       }
   },err => {
     return false;
   });
 
   return false;
   }

  public getIsAdminFromLocalStorage(): boolean {
    return localStorage.getItem('isAdmin') === 'true';
  }
  //-----------------------
  private apiUrlEmployee   = 'http://137.184.119.246/api/employees';
  
  getEmployees(search?: string, valid?: number): Observable<EmployeeResponse> {
    return this.http.get<EmployeeResponse>(`${this.apiUrlEmployee}?search=${search}&valid=${valid}`);
  }
  

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrlEmployee}/${id}`);
  }

  addEmployee(employee: FormData): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrlEmployee, employee);
  }

  updateEmployee(employee: FormData,id:number): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrlEmployee}/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrlEmployee}/${id}`);
  }

  //----------------------------
  //request
  private apiUrlRequest = 'http://137.184.119.246/api/orders';
  
  getRequest(criteria: any): Observable<RequestResponse> {
    let params = new HttpParams();

    if (criteria.name) {
      params = params.append('name', criteria.name);
    }
    if (criteria.dateAdded) {
      params = params.append('dateAdded', criteria.dateAdded);
    }
    if (criteria.state) {
      params = params.append('state', criteria.state);
    }

    return this.http.get<RequestResponse>(this.apiUrlRequest,  { params });
  }

  getRequestId(id: number): Observable<Request> {
    return this.http.get<Request>(`${this.apiUrlRequest}/${id}`);
  }

  addRequest(request: Request): Observable<Request> {
    return this.http.post<Request>(this.apiUrlRequest, request);
  }

  updateRequest(request: Request): Observable<Request> {
    return this.http.put<Request>(`${this.apiUrlRequest}/${request.id}`, request);
  }

  deleteRequest(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrlRequest}/${id}`);
  }
}
