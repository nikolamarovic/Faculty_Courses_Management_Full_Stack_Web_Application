import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Predmet } from '../model/predmet.model';

@Injectable({
  providedIn: 'root'
})
export class PredmetiService {

  uri = "http://localhost:4000";

  constructor(private httpClient:HttpClient) { }
  
  dohvatiPredmet(id:string){
    return this.httpClient.post(`${this.uri}/dohvatiPredmet`, {"sifra":id});
  }

  dohvatiPredmeteNaOdseku(odsek){
    return this.httpClient.post(`${this.uri}/dohvatiPredmeteNaOdseku`, {"odsek":odsek});
  }

  dohvatiPredmetePoOdsekuISemestru(odsek, semestar){
    return this.httpClient.post(`${this.uri}/dohvatiPredmetePoOdsekuISemestru`, {"odsek":odsek, "semestar":semestar});
  }

  dohvatiPredmeteNastavnika(kor_ime){
    return this.httpClient.post(`${this.uri}/dohvatiPredmeteNastavnika`,{"kor_ime":kor_ime});
  }

  unesiOpsteIzmeneZaPredmet(stara_sifra, uslov, status, cilj, bodovi, sifra){
    return this.httpClient.post(`${this.uri}/opsteIzmenePredmet`,{"stara_sifra":stara_sifra,"uslov":uslov, "status":status,"cilj":cilj, "bodovi":bodovi,"sifra":sifra});
  }

  dodajFajl(sifra_predmet, tekst_fajla, naslov, tip_fajla, tip_nastave,ime_fajla){
    return this.httpClient.post(`${this.uri}/dodajFajlUPredmet`,{
      "naslov":naslov,
      "ime_fajla":ime_fajla,
      "tip_fajla":tip_fajla,
      "tip_nastave":tip_nastave,
      "sifra":sifra_predmet,
      "tekst":tekst_fajla
    });
  }

  dohvatiGrupeNaPredmetuZaNastavnika(sifra_predmeta, kor_ime_nastavnika){
    return this.httpClient.post(`${this.uri}/dohvatiGrupeNaPredmetuZaNastavnika`,{"sifra":sifra_predmeta, "kor_ime":kor_ime_nastavnika});
  }

  dodajPredmet(naziv, fond, bodovi, sifra, godina, semestar, odsek, status, uslov, cilj ){
    return this.httpClient.post(`${this.uri}/dodajPredmet`,{
      "sifra":sifra,
      "fond":fond,
      "bodovi":<number>bodovi,
      "tip":status,
      "odsek":odsek,
      "semestar":<number>semestar,
      "godina":<number>godina,
      "naziv":naziv,
      "cilj":cilj,
      "uslov":uslov,
      "materijali":new Array<Object>(),
      "laboratorija":new Array<Object>(),
      "projekat":new Object(),
      "komentar":"",
      "grupa":new Array<Object>(),
      "lab_sakriven":'false',
      "rokovi_sakriven":'false',
      "projekat_sakriven":'false',
    });
  }

  dodajGrupuUPredmet(sifra, grupa, termin){
    return this.httpClient.post(`${this.uri}/dodajGrupuUPredmet`,{"sifra":sifra,"grupa":grupa,"termin":termin});
  }
  dohvatiPredmete(){
    return this.httpClient.get(`${this.uri}/dohvatiPredmete`);
  }
  
  obrisiPredmet(sifra){
    return this.httpClient.post(`${this.uri}/obrisiPredmet`,{"sifra":sifra});
  }

  promeniVidljivostLab(sifra, b){
    return this.httpClient.post(`${this.uri}/promeniVidljivostLab`,{"sifra":sifra, "vidljivost":b});
  }
  
  promeniVidljivostProjekat(sifra, b){
    return this.httpClient.post(`${this.uri}/promeniVidljivostProjekat`,{"sifra":sifra, "vidljivost":b});
  }

  promeniVidljivostRokovi(sifra, b){
    return this.httpClient.post(`${this.uri}/promeniVidljivostRokovi`,{"sifra":sifra, "vidljivost":b});
  }
}
