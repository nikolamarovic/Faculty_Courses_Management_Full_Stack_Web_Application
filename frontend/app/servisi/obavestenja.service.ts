import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObavestenjaService {
  uri = "http://localhost:4000";
  constructor(private httpClient:HttpClient) { }

  dohvatiSvaObavestenja(){
    return this.httpClient.get(`${this.uri}/dohvatiSvaObavestenja`);
  }

  dodajObavestenje(naziv, kategorija, tekst){
    return this.httpClient.post(`${this.uri}/dodajObavestenje`,{"naslov":naziv, "kategorija":kategorija,"tekst":tekst,"datum":new Date()});
  }

  obrisiObavestenje(id){
    return this.httpClient.post(`${this.uri}/obrisiObavestenje`,{"id":id});
  }

  dohvatiProjekte(){
    return this.httpClient.get(`${this.uri}/dohvatiProjekte`);
  }
}
