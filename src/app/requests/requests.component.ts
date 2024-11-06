import { Component, Input, OnInit } from '@angular/core';
import { Request } from '../models/Request';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  isAdmin: boolean= false;
  requests:Request[] = [];
  searchCriteria = {
    name: '',        // Filter by name
    dateAdded: '',   // Filter by date added
    state: ''  ,      // Filter by request status
    order:'created',
    valid:''
  };

  constructor(private requestService: ApiService) {
    this.isAdmin=requestService.getIsAdminFromLocalStorage();
   }
   
  ngOnInit(): void {
    this.onSearch();
   }
  
  onSearch() {
    // Call service to search requests by the given criteria
    this.requestService.getRequest(this.searchCriteria).subscribe({
      next: (response) => {
        this.requests = response.data; // Update the request list with filtered data
      },
      error: (error) => {
        console.error('Error fetching search results:', error);
      }
    });
  }


  stars: number[] = [1, 2, 3, 4, 5]; // Array for 5 stars
  getBooleanArray(count: number): boolean[] {
    return Array(count).fill(true);
  }
}
