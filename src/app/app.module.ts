// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';  // Import HttpClientModule
import { FormsModule } from '@angular/forms';  // For forms, if needed
import { GoogleMapsModule } from '@angular/google-maps';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { EmployeeComponent } from './employee/employee.component';
import { RequestsComponent } from './requests/requests.component';
import { CeilPipe } from './ceil.pipe';
import { AddEditEmployeeComponent } from './add-edit-employee/add-edit-employee.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { AddRequestComponent } from './add-request/add-request.component';
import { MyMapComponent } from './my-map/my-map.component';
import { CommonModule } from '@angular/common';  // Import CommonModule

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    EmployeeComponent,
    RequestsComponent,
    CeilPipe,
    AddEditEmployeeComponent,
    AddRequestComponent,
    MyMapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,   // Add HttpClientModule here
    FormsModule, NgbModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
