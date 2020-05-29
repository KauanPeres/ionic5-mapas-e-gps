import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { animation } from '@angular/animations';
import { ILocal } from '../interfaces/ILocal';

declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  map: any;
  posicaoAtual: any;

public listaLocais: ILocal[] = [
  {
    lat: -22.476198,
    lng: -48.557020,
    titulo: 'Igreja'
  },
  {
    lat: -22.476927,
    lng: -48.558549,
    titulo: 'ETC & TAL'
  },
  {
    lat: -22.478446,
    lng: -48.559370,
    titulo: 'Rafa doces e salgados'
  },
  {
    lat: -22.482287,
    lng: -48.559084,
    titulo: 'Edícula Capelozza'
  },
  {
    lat: -22.483359,
    lng: -48.556177,
    titulo: 'Edícula da Bete'
  }
];

  @ViewChild('map', {read: ElementRef, static:false}) mapRef: ElementRef;

  constructor(private geolocation: Geolocation) {}

  public async showMap(){

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

    for(let local of this.listaLocais){
      this.adicionarMarcador(local);
    }
  }

  ionViewDidEnter(){
    this.showMap();
  }

  private adicionarMarcador(local:ILocal){
    const { lat, lng, titulo } = local;

    const marcador = new google.maps.Marker({
      position: { lat, lng },
      map: this.map,
      title: titulo,
    })
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
