import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  companyInfo: any;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getMainInfo().subscribe(
      (data) => {
        this.companyInfo = data;
      },
      (error) => {
        console.error('Error fetching company info', error);
      }
    );
  }
}
