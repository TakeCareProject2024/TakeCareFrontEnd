// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';  // Import HttpClientModule
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
import { CommonModule } from '@angular/common';
import { RequestElementComponent } from './request-element/request-element.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { DatePipe } from '@angular/common'; // Import DatePipe here
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    RequestElementComponent,
    DashBoardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,   // Add HttpClientModule here
    FormsModule, NgbModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [DatePipe,
    { provide: 'google-maps-api-key', useValue: "AIzaSyBnmKPsTtY_JF3N74MIBVq5xg62P97tt_g" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
