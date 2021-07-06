import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FajloviService {
  uri = 'http://localhost:4000';

  constructor(private httpClient:HttpClient) { }

  dohvatiSveFajloveNaPredmetu(sifra){
    return this.httpClient.post(`${this.uri}/dohvatiSveFajloveNaPredmetu`,{sifra_predmeta:sifra});
  }

  preuzmiFajl(ime_fajla){
    return this.httpClient.post(`${this.uri}/download`,{"filename":ime_fajla},{responseType:'blob'});
  }

  dohvatiFajlSaImenom(ime){
    return this.httpClient.post(`${this.uri}/dohvatiFajlSaImenom`,{"ime":ime});
  }
}
