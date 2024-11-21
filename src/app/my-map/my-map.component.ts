import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import {  MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-my-map',
  templateUrl: './my-map.component.html',
  styleUrls: ['./my-map.component.css']
})
export class MyMapComponent implements OnInit {

  @Input() requestForm: any;
  
  @Input() Lat!: number;
  @Input() Lang!: number;
  @Input() height: string;
  @Input() width: string;

  @Output() LatChange = new EventEmitter<number>(); // Notify parent of latitude change
  @Output() LangChange = new EventEmitter<number>(); // Notify parent of longitude change

  center: google.maps.LatLngLiteral;
  zoom = 12;
  markerPosition: any;
  
constructor(){

  //this.Lat=2.48723641360933;
  //this.Lang=54.37462243953436;
  this.height="150px";
  this.width="100%";

  this.center={ lat: this.Lat, lng: this.Lang };
  this.markerPosition={ lat: this.Lat, lng: this.Lang};  
  /*navigator.geolocation.getCurrentPosition((position) => {
    this.center = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
  });*/

}

  ngOnInit(){   }

  ngOnChanges(changes: SimpleChanges): void {
    // Check if Lat or Lang has changed
    if ((changes['Lat'] || changes['Lang']) && (this.Lat!=undefined && this.Lang!=undefined)) {
      this.Lat=Number(this.Lat);
      this.Lang=Number(this.Lang);
      
      this.center = { lat: this.Lat, lng: this.Lang };
      this.markerPosition={ lat: this.Lat, lng: this.Lang}; 
    }
  }

  onMapClick(event: google.maps.MapMouseEvent) {
    if (event.latLng) {

      this.LatChange.emit( event.latLng.lat());
      this.LangChange.emit( event.latLng.lng());

      if(this.requestForm!=undefined){
        this.markerPosition = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng()
        };
  
        this.requestForm.patchValue({
          Lat: event.latLng.lat(),
          Lang: event.latLng.lng()
        });
      }
      
    }
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

