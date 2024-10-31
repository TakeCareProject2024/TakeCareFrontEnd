// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient ,HttpParams} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Employee } from '../models/Employee';
import { MainInfo } from '../models/MainInfo';
import { Request } from  '../models/Request';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrlEmployee = 'your-api-url/employees';
  private isAdminSubject = new BehaviorSubject<boolean>(false);
  public isAdmin$ = this.isAdminSubject.asObservable();

  constructor(private http: HttpClient) {}

  stateAdmin(state:boolean){
    this.isAdminSubject.next(state);
  }

  checkPassword(password: string): Observable<boolean> {
    return this.http.post<boolean>('/api/check-password', { password }).pipe(
      tap((isValid) => {
        if (isValid) {
          this.isAdminSubject.next(true);
          localStorage.setItem('isAdmin', JSON.stringify(true)); // Save to local storage
        }else{
          this.isAdminSubject.next(false);
          localStorage.setItem('isAdmin', JSON.stringify(false)); // Save to local storage
          
        }
      })
    );
  }

  private getAdminFromStorage(): boolean {
    return JSON.parse(localStorage.getItem('isAdmin') || 'false');
  }

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
  private apiUrlMainInfo = 'your-api-url/employees';
  
  getMainInfo(): Observable<MainInfo> {
    return this.http.get<MainInfo>(this.apiUrlMainInfo);
  }
  
  updateMainInfo(mainInfo: MainInfo): Observable<MainInfo> {
    return this.http.put<MainInfo>(`${this.apiUrlEmployee}/${mainInfo.id}`, mainInfo);
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
