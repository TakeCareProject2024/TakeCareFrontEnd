// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient ,HttpParams} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Employee, EmployeeResponse } from '../models/Employee';
import { MainInfo, MainInfoResponse } from '../models/MainInfo';
import { Request, RequestResponse } from  '../models/Request';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  //---------------------------------------------------------
  
  setIsAdmin(isAdmin: boolean): void {
    localStorage.setItem('isAdmin', isAdmin.toString());
  }

  checkPassword(password: string): boolean {
    if(password=="12345"){
      this.setIsAdmin(true);
      return true;
    }
    else{
      this.setIsAdmin(false);
      return false;
    } 
  }

  /*checkPassword(password: string): Observable<boolean> {
    return this.http.post<boolean>('/api/check-password', { password }).pipe(
      tap((isValid) => {
        this.setIsAdmin(isValid);
      })
    );
  }*/

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

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrlEmployee, employee);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrlEmployee}/${employee.id}`, employee);
  }

  deleteEmployee(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrlEmployee}/${id}`);
  }

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
