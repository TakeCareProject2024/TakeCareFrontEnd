import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {  MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-my-map',
  templateUrl: './my-map.component.html',
  styleUrls: ['./my-map.component.css']
})
export class MyMapComponent implements OnInit {

  @Input() employeeForm: any;

  center: google.maps.LatLngLiteral = { lat: 24.48723641360933, lng: 54.37462243953436 };
  zoom = 12;
  markerPosition: any = { lat: 24.48723641360933, lng: 54.37462243953436};
  
  ngOnInit(){ 
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });

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

  
 
  /*
  markerOptions: google.maps.MarkerOptions = { draggable: true };
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  };
  

  markers :any = [];
  infoContent = '';


  openInfo(marker: MapMarker, content:string) {
    this.infoContent = content;
    this.info.open(marker);
  

  onMarkerDragEnd(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.updateFormCoordinates(event.latLng.lat(), event.latLng.lng());
    }
  }

 
    
  in map-marker : (mapDragend)="onMarkerDragEnd($event)" / [options]="markerOptions"
  in google-map:(mapClick)="onMapClick($event)"
  
  
  
   zoomIn() {
    if (this.zoom < 15) this.zoom++;
  }
 
  zoomOut() {
    if (this.zoom > 2) this.zoom--;
  }

  addMarker() {
    this.markers.push({
      position: {
        lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
        lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
      },
      label: {
        color: 'red',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      title: 'Marker title ' + (this.markers.length + 1),
      options: { animation: google.maps.Animation.BOUNCE },
    });
  }
    
  */

}

