// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient ,HttpParams} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Employee } from '../models/Employee';
import { MainInfo, MainInfoResponse } from '../models/MainInfo';
import { Request } from  '../models/Request';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  private apiUrlEmployee = 'your-api-url/employees';

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

  getEmployees(search?: string, valid?: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrlEmployee}?search=${search}&valid=${valid}`);
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
  
  getMainInfo(): Observable<MainInfoResponse> {
    return this.http.get<MainInfoResponse>(this.apiUrlMainInfo+"/1");
  }
  
  updateMainInfo(mainInfo: MainInfo): Observable<MainInfoResponse> {
    return this.http.put<MainInfoResponse>(`${this.apiUrlMainInfo}/${mainInfo.id}`, mainInfo);
  }


  //request
  private apiUrlRequest = 'your-api-url/employees';
  
  getRequest(criteria: any): Observable<Request[]> {
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

    return this.http.get<Request[]>(this.apiUrlRequest,  { params });
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

  deleteRequest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlRequest}/${id}`);
  }
}
