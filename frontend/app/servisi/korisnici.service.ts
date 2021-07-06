import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../model/student.model';

@Injectable({
  providedIn: 'root'
})
export class KorisniciService {

  uri = 'http://localhost:4000';

  constructor(private httpClient: HttpClient) { }

  dohvatiSveZaposlene(){
    return this.httpClient.get(`${this.uri}/zaposleni`);
  }

  dohvatiKorisnikaPoId(id){
    return this.httpClient.post(`${this.uri}/dohvatiKorisnikaPoId`, {kor_id:id});
  }

  dohvatiKorisnikaPoKorImenu(kor_ime){
    return this.httpClient.post(`${this.uri}/dohvatiKorisnikaPoKorImenu`, {kor_ime:kor_ime});
  }

  izmeniKorisnika(id,ime, prezime, adresa, broj_kabineta, zvanje, telefon, biografija){
    return this.httpClient.post(`${this.uri}/opsteIzmeneKorisnik`,{
      "id":id,
      "ime":ime,
      "prezime":prezime,
      "broj_kabineta":broj_kabineta,
      "zvanje":zvanje,
      "adresa":adresa,
      "telefon":telefon,
      "biografija":biografija
    });
  }

  prijava(kor_ime, lozinka, s){
    
    let data = {
      kor_ime:kor_ime,
      lozinka:lozinka,
      student:s
    }
    return this.httpClient.post(`${this.uri}/prijava`, data);
  }

  promeniLozinku(lozinka,student_id){
    return this.httpClient.post(`${this.uri}/promeniLozinku`,{"lozinka":lozinka, "student":student_id});
  }

  registrujStudenta(s:Student){
    return this.httpClient.post(`${this.uri}/registrujStudenta`,{"student":s});
  }

  dohvatiStudentaPoId(id){
    return this.httpClient.post(`${this.uri}/dohvatiStudentaPoId`,{"id":id});
  }

  dohvatiStudentaPoKorImenu(kor_ime){
    return this.httpClient.post(`${this.uri}/dohvatiStudentaPoKorImenu`,{"kor_ime":kor_ime});
  }

  dodajSpisakStudentu(kor_ime, spisak_id, grupa_id){
    return this.httpClient.post(`${this.uri}/dodajSpisakStudentu`,{"kor_ime":kor_ime,"spisak_id":spisak_id,"grupa_id":grupa_id});
  }
  obrisiSpisakStudentu(kor_ime, spisak_id){
    return this.httpClient.post(`${this.uri}/obrisiSpisakStudentu`,{"spisak_id":spisak_id,"kor_ime":kor_ime});
  }

  dodajKorisnika(
    zaposlen_forma_ime,
    zaposlen_forma_prezime,
    zaposlen_forma_adresa,
    zaposlen_forma_kor_ime,
    zaposlen_forma_lozinka,
    zaposlen_forma_mejl,
    zaposlen_forma_kabinet,
    zaposlen_forma_telefon,
    zaposlen_forma_sajt,
    zaposlen_forma_biografija,
    zaposlen_forma_zvanje
    ){
      return this.httpClient.post(`${this.uri}/dodajKorisnika`,{
        "ime":zaposlen_forma_ime,
        "prezime":zaposlen_forma_prezime,
        "adresa":zaposlen_forma_adresa,
        "korisnicko_ime":zaposlen_forma_kor_ime,
        "lozinka":zaposlen_forma_lozinka,
        "mejl":zaposlen_forma_mejl,
        "broj_kabineta":zaposlen_forma_kabinet,
        "telefon":zaposlen_forma_telefon,
        "sajt":zaposlen_forma_sajt,
        "biografija":zaposlen_forma_biografija,
        "zvanje":zaposlen_forma_zvanje,
        "status":"aktivan",
        "tip":"zaposlen",
        "predmeti":new Array<Object>(),
        "slika":'no_picture.png'
    });
  }

  obrisiKorisnika(id){
    return this.httpClient.post(`${this.uri}/obrisiKorisnika`,{"id":id});
  }
  
  dohvatiStudente(){
    return this.httpClient.post(`${this.uri}/dohvatiStudente`,{});
  }

  dodajPredmetStudentu(id, sifra){
    return this.httpClient.post(`${this.uri}/dodajPredmetStudentu`,{"id":id, "sifra":sifra});
  }

  dodajZaposlenogNaPredmet(sifra, kor_ime, id_grupe, ime, prezime){
    return this.httpClient.post(`${this.uri}/dodajZaposlenogNaPredmet`,{"kor_ime":kor_ime, "sifra":sifra,"grupa":id_grupe,"ime":ime,"prezime":prezime});
  }

  dodajPredmetZaposlenom(id, sifra, grupa){
    return this.httpClient.post(`${this.uri}/dodajPredmetZaposlenom`,{"id":id,"grupa":grupa, "sifra":sifra});
  }

  izbaciZaposlenogSaPredmeta(sifra, kor_ime, id_grupe, ime, prezime, grupa_ime){
    return this.httpClient.post(`${this.uri}/izbaciZaposlenogSaPredmeta`,{"kor_ime":kor_ime, "sifra":sifra,"grupa":id_grupe,"ime":ime,"prezime":prezime,"grupa_ime":grupa_ime});
  }

  ukloniPredmetIzZaposlenog(id,sifra){
    return this.httpClient.post(`${this.uri}/ukloniPredmetIzZaposlenog`,{"id":id,"sifra":sifra});
  }
  ukloniPredmetIzStudenta(id,sifra){
    return this.httpClient.post(`${this.uri}/ukloniPredmetIzStudenta`,{"id":id, "sifra":sifra});
  }
}
