import { SifraGrupaPredmet } from "./sifraGrupaPredmet";

export class Zaposlen{
    _id:number;
    korisnicko_ime:string;
    lozinka:string;
    mejl:string;
    ime:string;
    prezime:string;
    adresa:string;
    telefon:string;
    sajt:string;
    biografija:string;
    zvanje:string;
    broj_kabineta:string;
    status:string;
    tip:string;
    predmeti:Array<SifraGrupaPredmet>;
    slika:string;
}