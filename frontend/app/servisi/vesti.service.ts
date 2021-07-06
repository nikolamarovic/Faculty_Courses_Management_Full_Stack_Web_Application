import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Predmet } from '../model/predmet.model';

@Injectable({
  providedIn: 'root'
})
export class VestiService {

  uri = "http://localhost:4000";

  constructor(private httpClient:HttpClient) { }

  dodajVest(naslov, tekst, predmeti,nastavnik, nastavnik_id, datum){
    let tmp_p = new Array<Object>();
    predmeti.forEach(p=>{
      tmp_p.push({"sifra":p.sifra});
    })
    return this.httpClient.post(`${this.uri}/dodajVest`,{"naslov":naslov,"tekst":tekst,"predmeti":tmp_p,"nastavnik":nastavnik, "nastavnik_id":nastavnik_id,"datum":datum});
  }

  ukloniPredmetIzVesti(id, sifra){
    return this.httpClient.post(`${this.uri}/ukloniPredmetIzVesti`,{"sifra":sifra,"id":id});
  }

  dohvatiVestiZaPredmet(sifra){
    return this.httpClient.post(`${this.uri}/dohvatiVestiZaPredmet`,{"sifra":sifra});
  }

  dohvatiVestiNastavnika(id){
    return this.httpClient.post(`${this.uri}/dohvatiVestiNastavnika`,{"id":id});
  }

  obrisiVest(id){
    return this.httpClient.post(`${this.uri}/obrisiVest`,{"id":id});
  }

  dodajFajlUVest(id,fajl){
    return this.httpClient.post(`${this.uri}/dodajFajlUVest`,{"id":id,"fajl":fajl});
  }
}
