import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { animation } from '@angular/animations';

declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  map: any;
  posicaoAtual: any;
  location1: any;
  location2: any;
  location3: any;
  location4: any;
  location5: any;

  @ViewChild('map', {read: ElementRef, static:false}) mapRef: ElementRef;

  constructor(private geolocation: Geolocation) {}

  public async showMap(){
    const location1 = new google.maps.LatLng(-22.476198, -48.557020);   //Igreja
    const location2 = new google.maps.LatLng(-22.476927, -48.558549);   //ETC & TAL
    const location3 = new google.maps.LatLng(-22.478446, -48.559370);   //Rafa doces e salgados
    const location4 = new google.maps.LatLng(-22.482287, -48.559084);   //Edícula Capelozza    
    const location5 = new google.maps.LatLng(-22.483359, -48.556177);   //Edícula da Bete                      

    await this.buscaPosicao();

    const options = {
      center: this.posicaoAtual,
      zoom: 15,
      disableDefaultUI: true
    }
    this.map = new google.maps.Map(this.mapRef.nativeElement, options)

    const marcadorMinhaPosicao = new google.maps.Marker({
      position: this.posicaoAtual,
      map: this.map,
      title: "Minha localização",
      //icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
      animation: google.maps.Animation.DROP
    })

    const marcadorPosicao1 = new google.maps.Marker({
      position: location1,
      map: this.map,
      title: "Igreja",
      //icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
      animation: google.maps.Animation.DROP
    })

    const marcadorPosicao2 = new google.maps.Marker({
      position: location2,
      map: this.map,
      title: "Rafa doces e salgados",
      //icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
      animation: google.maps.Animation.DROP
    })

    const marcadorPosicao3 = new google.maps.Marker({
      position: location3,
      map: this.map,
      title: "ETC & TAL",
      //icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
      animation: google.maps.Animation.DROP
    })

    const marcadorPosicao4 = new google.maps.Marker({
      position: location4,
      map: this.map,
      title: "Edícula Capelozza",
      //icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
      animation: google.maps.Animation.DROP
    })

    const marcadorPosicao5 = new google.maps.Marker({
      position: location5,
      map: this.map,
      title: "Edícula da Bete ",
      //icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
      animation: google.maps.Animation.DROP
    })
  }

  ionViewDidEnter(){
    this.showMap();
  }

  public async buscaPosicao(){
    await this.geolocation.getCurrentPosition().then((posicaoGPS) => {
      this.posicaoAtual = {
        lat: posicaoGPS.coords.latitude,
        lng: posicaoGPS.coords.longitude
      }
  }).catch((error) => {
  console.log('Error getting location', error);
  }); 
  }
}
