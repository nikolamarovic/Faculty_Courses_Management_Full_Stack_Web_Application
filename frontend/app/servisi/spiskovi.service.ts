import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Spisak } from '../model/spisak.model';

@Injectable({
  providedIn: 'root'
})
export class SpiskoviService {

  uri = "http://localhost:4000";

  constructor(private httpClient:HttpClient) { }

  dodajSpisak(naziv_spiska, nastavnik, id,predmet, broj_termina, istice){
    return this.httpClient.post(`${this.uri}/dodajSpisak`,{
      "naziv_spiska":naziv_spiska,
      "nastavnik":nastavnik,
      "predmet":predmet,
      "broj_termina":broj_termina,
      "istice":istice,
      "id":id
    });
  }

  dodajTerminUSpisak(){
    return this.httpClient.post(`${this.uri}/dodajSpisak`,{});
  }

  dodajGrupuUTermin(indeks_spiska, indeks_termina, ime_grupe, mesto, limit, vreme){
    return this.httpClient.post(`${this.uri}/dodajGrupuUTermin`,{
      "indeks_spiska":indeks_spiska,
      "indeks_grupe":indeks_termina,
      "ime_grupe":ime_grupe,
      "mesto":mesto,
      "limit":limit,
      "vreme":vreme
    });
  }

  dohvatiSpiskoveNastavnika(id){
    return this.httpClient.post(`${this.uri}/dohvatiSpiskoveNastavnika`,{"id":id});
  }

  dohvatiSpisakSaId(id){
    return this.httpClient.post(`${this.uri}/dohvatiSpisakSaId`,{"id":id});
  }

  dohvatiAktivneSpiskoveZaPredmet(sifra){
    return this.httpClient.post(`${this.uri}/dohvatiAktivneSpiskoveNaPredmetu`,{"sifra":sifra});
  }

  dodajStudentaNaSpisak(spisak, grupa, sifra){
    return this.httpClient.post(`${this.uri}/dodajStudentaNaSpisak`,{"spisak_id":spisak,"grupa_id":grupa, "id_s":sifra});
  }

  obrisiStudentaSaSpiska(spisak, grupa, sifra){
    return this.httpClient.post(`${this.uri}/obrisiStudentaSaSpiska`,{"spisak_id":spisak,"grupa_id":grupa, "id_s":sifra});
  }

  zatvoriSpisak(id, status){
    return this.httpClient.post(`${this.uri}/promeniStatusSpisku`,{"spisak_id":id,"status":status});
  }

}
