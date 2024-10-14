import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-map',
  templateUrl: './my-map.component.html',
  styleUrls: ['./my-map.component.css']
})
export class MyMapComponent implements OnInit {

  @Input() employeeForm: any;

  center: google.maps.LatLngLiteral = { lat: 40.73061, lng: -73.935242 }; // New York as default
  zoom = 8;
  markerPosition: google.maps.LatLngLiteral = { lat: 40.73061, lng: -73.935242 };
  markerOptions: google.maps.MarkerOptions = { draggable: true };


  ngOnInit(){   }
/*
  onMarkerDragEnd(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.updateFormCoordinates(event.latLng.lat(), event.latLng.lng());
    }
  }

  onMapClick(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.markerPosition = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      };
      this.updateFormCoordinates(event.latLng.lat(), event.latLng.lng());
    }
  }

  updateFormCoordinates(lat: number, lng: number) {
    this.employeeForm.patchValue({
      lat: lat,
      lng: lng
    });
  }
    
  in map-marker : (mapDragend)="onMarkerDragEnd($event)" / [options]="markerOptions"
  in google-map:(mapClick)="onMapClick($event)"
  */

}

