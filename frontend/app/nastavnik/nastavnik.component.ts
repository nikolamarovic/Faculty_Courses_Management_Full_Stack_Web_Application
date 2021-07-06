import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ɵɵqueryRefresh } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { Fajl } from '../model/fajl.model';
import { Predmet } from '../model/predmet.model';
import { Vest } from '../model/vest.model';
import { Zaposlen } from '../model/zaposlen.model';
import { FajloviService } from '../servisi/fajlovi.service';
import { KorisniciService } from '../servisi/korisnici.service';
import { PredmetiService } from '../servisi/predmeti.service';
import { UploadService } from '../servisi/upload.service';
import { saveAs } from 'file-saver'
import { VestiService } from '../servisi/vesti.service';
import { GrupaTermin } from '../model/grupa_predmet.model';
import { SpiskoviService } from '../servisi/spiskovi.service';
import { Spisak } from '../model/spisak.model';

const tmp = 'http://localhost:4000/upload';
const tmp_upload_vesti = 'http://localhost:4000/upload_vest';
const tmp_upload_spisak = 'http://localhost:4000/upload_spisak';

@Component({
  selector: 'app-nastavnik',
  templateUrl: './nastavnik.component.html',
  styleUrls: ['./nastavnik.component.css']
})
export class NastavnikComponent implements OnInit {
  
  uploader:FileUploader = new FileUploader({url:tmp, itemAlias:'file'});
  uploader_vesti:FileUploader = new FileUploader({url:tmp_upload_vesti, itemAlias:'file'});
  uploader_spisak:FileUploader = new FileUploader({url:tmp_upload_spisak, itemAlias:'file'});
  lista_upload:any = [];

  nastavnik:Zaposlen;
  predmeti:Array<Predmet>;

  fajlovi:Fajl[];
  fajlovi_predavanja:Fajl[];
  fajlovi_vezbe:Fajl[];
  fajlovi_rokovi:Fajl[];
  fajlovi_lab:Fajl[];
  fajlovi_projekat:Fajl[];


  izabran_predmet: Predmet;
  selected = new FormControl(0);

  forma_status:string;
  forma_bodovi:number;
  forma_sifra:string;
  forma_uslov:string;
  forma_cilj:string;

  forma_ime:string;
  forma_prezime:string;
  forma_adresa:string;
  forma_telefon:string;
  forma_biografija:string;
  forma_kabinet:string;
  forma_zvanje:string;

  poruka:string;
  naslov_fajla:string;
  tekst_fajla:string;
  posl_fajl_uploadname:string;
  tip_nastave:string;

  predmeti_vesti:Array<{sifra:string}>;
  tekst_vesti:string;
  naslov_vesti:string;
  datum_vesti:Date;
  sifre_predmeta_za_vesti:String;

  vesti_nastavnika:Vest[];

  spisak_vreme1:string;
  spisak_datum1:string;
  spisak_vreme2:string;
  spisak_datum2:string;

  predmet_spisak:Predmet;
  broj_termina_za_spisak:number;
  broj_grupa_za_spisak:Array<number>;
  broj_grupa_za_spisak_tmp:Array<number>;
  prikazi_dodajGrupu:Array<boolean>;

  spisak_naziv:string;
  spisak_istice:string;
  spisak_ime_grupe:string;
  spisak_limit_grupe:string;
  spisak_mesto_grupe:string;
  spisak_datum_grupe:string;
  spisak_vreme_grupe:string;
  trenutni_spisak:Spisak;
  spiskovi_nastavnika:Array<Spisak>;

  constructor(private korisniciServis:KorisniciService, private router:Router, private predmetiServis:PredmetiService,
    private fajloviServis:FajloviService, private vestiServis:VestiService, private spiskoviServis:SpiskoviService) {
    //UPLOADER ZA PREDAVANJA, VEZBE, PROJEKAT, LAB, ROKOVE
      this.uploader.onCompleteItem=(item:any, response:any, status:any, header:any)=>{
      this.posl_fajl_uploadname = JSON.parse(response);
      if(localStorage.getItem('poslednja_vest')!=""){
        // alert(this.posl_fajl_uploadname);
        this.vestiServis.dodajFajlUVest(localStorage.getItem("poslednja_vest"),""+ this.posl_fajl_uploadname).subscribe((p:Object)=>{
          localStorage.setItem("poslednja_vest","");
        })
      }else{
        this.dodajFajlUPredmet(this.izabran_predmet.sifra, this.naslov_fajla, this.tekst_fajla, this.posl_fajl_uploadname, this.tip_nastave, this.uploader.queue[0].file.name.split('.').pop());
      }
      
    }
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
  }

  ngOnInit(): void {
    this.nastavnik = {} as Zaposlen;
    this.predmeti = [] as Array<Predmet>;

    this.fajlovi = [] as Array<Fajl>;
    this.fajlovi_predavanja = [] as Array<Fajl>;
    this.fajlovi_rokovi = [] as Array<Fajl>;
    this.fajlovi_vezbe = [] as Array<Fajl>;
    this.fajlovi_lab = [] as Array<Fajl>;
    this.fajlovi_projekat = [] as Array<Fajl>;
    this.predmeti_vesti = [] as Array<{sifra:string}>;

    this.izabran_predmet = {} as Predmet;
    this.naslov_fajla = "";
    this.tekst_fajla = "";

    this.vesti_nastavnika = [] as Vest[];

    this.predmet_spisak = {} as Predmet;
    this.broj_termina_za_spisak = 0;
    this.broj_grupa_za_spisak = [] as Array<number>;
    this.broj_grupa_za_spisak_tmp = [] as Array<number>;
    this.prikazi_dodajGrupu = [] as Array<boolean>;
    this.spisak_ime_grupe = "";
    this.spisak_limit_grupe = "";
    this.spisak_mesto_grupe = "";
    this.spisak_vreme_grupe = "";
    this.spisak_datum_grupe = "";
    this.spisak_naziv = "";
    this.trenutni_spisak = {} as Spisak;
    this.spiskovi_nastavnika = [] as Array<Spisak>;
    localStorage.setItem("poslednja_vest","");

    this.sifre_predmeta_za_vesti = "";
    if(localStorage.getItem("korisnik")!="" && localStorage.getItem("tip")=='0'){
      this.dohvatiKorisnika(localStorage.getItem("korisnik"));
    }else{
      this.router.navigate([""]);
    }
    
  }

  uploadFajlove(item, tip_nastave){
    this.tip_nastave = tip_nastave;
    if(this.naslov_fajla != "" || (this.naslov_fajla != "" && this.tekst_fajla != "" && tip_nastave=='lab' || tip_nastave=='projekat')){
      this.uploader.onBuildItemForm = (item, form) => {
        form.append("sifra", this.izabran_predmet.sifra);
        form.append("ime", this.nastavnik.ime);
        form.append("prezime", this.nastavnik.prezime);
        form.append("tip_nastave", tip_nastave);
        form.append("velicina", Math.round((this.uploader.queue[0].file.size / 1024)));
        form.append("naslov", this.naslov_fajla);
        form.append("tekst_fajla", this.tekst_fajla);
        form.append("datum", (new Date()));
        form.append("tip_fajla", this.uploader.queue[0].file.name.split('.').pop());
      };
      this.uploader.uploadAll();
      this.uploader.onCompleteAll = ()=>{
        window.location.reload();
      }  
    }else alert("Morate uneti naslov fajla. Pokušajte ponovo.");
  }

  dodajFajlUPredmet(sifra, naslov, tekst_fajla, ime_fajla, tip_nastave, tip_fajla){
    this.predmetiServis.dodajFajl(sifra, tekst_fajla, naslov, tip_fajla, tip_nastave, ime_fajla).subscribe(()=>{ });
  }

  dodajSifrePredmetaZaVesti(sifra){
    this.sifre_predmeta_za_vesti = "";
    this.sifre_predmeta_za_vesti = sifra;
  }

  ubaciPredmetUListuZaVesti(){
    var tmp = new String(this.sifre_predmeta_za_vesti);
    var splits = tmp.split(",");
    this.predmeti.forEach(p=>{
      splits.forEach(s=>{
        if(p.sifra == s) this.predmeti_vesti.push({"sifra":<string>p.sifra});
      })  
    })
  }

  dodajVestiUPredmete(){
    this.uploadFajlove(new Object(),'');
    this.ubaciPredmetUListuZaVesti();
    this.vestiServis.dodajVest(this.naslov_vesti, this.tekst_vesti, this.predmeti_vesti, ("" + this.nastavnik.ime+this.nastavnik.prezime), this.nastavnik._id, this.datum_vesti).subscribe((v:Object)=>{
      localStorage.setItem("poslednja_vest",""+v);
    });
    this.predmeti_vesti = [];
    //location.reload();
  }

  dohvatiSveFajlove(){
    this.izabran_predmet.materijali.forEach(m=>{
      this.fajloviServis.dohvatiFajlSaImenom(m.ime_fajla_upload).subscribe((fajl:Fajl)=>{
        fajl.datum = new Date(fajl.datum);
        fajl.datum_string = "" + fajl.datum.getHours() + ":" + fajl.datum.getMinutes() + " " + fajl.datum.toLocaleDateString(undefined, {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'});
        if(fajl.tip_nastave=='predavanja') this.fajlovi_predavanja.push(fajl);
        if(fajl.tip_nastave=='vezbe') this.fajlovi_vezbe.push(fajl);
        if(fajl.tip_nastave=='rokovi') this.fajlovi_rokovi.push(fajl);
        if(fajl.tip_nastave=='lab') this.fajlovi_lab.push(fajl);
        if(fajl.tip_nastave=='projekat') this.fajlovi_projekat.push(fajl);
      })
    })
  }

  spisak(){
    // 13:16 2020-12-01

    alert(this.spisak_vreme1 + " " +  this.spisak_datum1);
    alert(this.spisak_vreme2 + " " +  this.spisak_datum2);

    let d1 = new Date(this.spisak_datum1 + " " + this.spisak_vreme1);
    let d2 = new Date(this.spisak_datum2 + " " + this.spisak_vreme2);
    if(d1 > d2) alert("veci prvi");
    if(d2 > d1) alert("veci drugi");
  }
  
  postaviPredmetZaSpisak(sifra){
    this.predmeti.forEach(p=>{
      if(p.sifra == sifra) {
        this.predmet_spisak = p;
      }
    })
  }

  promeniVidljivostLab(b){
    this.predmetiServis.promeniVidljivostLab(this.izabran_predmet.sifra,b).subscribe((p:Object)=>{
      location.reload();
    })
  }
  
  promeniVidljivostProjekat(b){
    this.predmetiServis.promeniVidljivostProjekat(this.izabran_predmet.sifra,b).subscribe((p:Object)=>{
      location.reload();
    })
  }
  
  promeniVidljivostRokovi(b){
    this.predmetiServis.promeniVidljivostRokovi(this.izabran_predmet.sifra,b).subscribe((p:Object)=>{
      location.reload();
    })
  }

  zatvoriSpisak(id, status){
    this.spiskoviServis.zatvoriSpisak(id,status).subscribe((p:Object)=>{
      this.dohvatiSpiskoveNastavnika();
    })
  }

  dohvatiSpiskoveNastavnika(){
    this.spiskoviServis.dohvatiSpiskoveNastavnika(this.nastavnik._id).subscribe((s:Array<Spisak>)=>{
      this.spiskovi_nastavnika = s;
    })
  }

  izlistajTermine(){
    for(let i=0;i<this.broj_termina_za_spisak;i++){
      this.broj_grupa_za_spisak_tmp[i] = 0;
      this.broj_grupa_za_spisak[i] = 0;
      this.prikazi_dodajGrupu[i] = true;
    }
    this.spiskoviServis.dodajSpisak(this.spisak_naziv, this.nastavnik.ime + " " + this.nastavnik.prezime, "" + this.nastavnik._id,this.predmet_spisak.sifra, this.broj_termina_za_spisak, this.spisak_datum2 + " " + this.spisak_vreme2).subscribe((s:Spisak)=>{
      this.trenutni_spisak = s;
    });
  }

  zavrsiPravljenjeSpiska(){
    location.reload();
  }

  dodajGrupu(indeks_termina){
    this.spiskoviServis.dodajGrupuUTermin(
      this.trenutni_spisak._id, 
      indeks_termina, 
      this.spisak_ime_grupe, 
      this.spisak_mesto_grupe, 
      this.spisak_limit_grupe,
      (this.spisak_datum_grupe + " " + this.spisak_vreme_grupe)).
      subscribe((s:Object)=>{
        this.spisak_ime_grupe = "";
        this.spisak_mesto_grupe = "";
        this.spisak_limit_grupe = "";
        this.spisak_vreme_grupe = "";
        this.spisak_datum_grupe = "";
        this.prikazi_dodajGrupu[indeks_termina] = false;
        this.spiskoviServis.dohvatiSpisakSaId(this.trenutni_spisak._id).subscribe((s:Spisak)=>{
          this.trenutni_spisak = s;
        })
    })
  }

  prikaziFormuZaDodavanjeGrupe(ind){
    this.prikazi_dodajGrupu[ind] = true;
  }

  dohvatiKorisnika(id){
    this.korisniciServis.dohvatiKorisnikaPoId(id).subscribe((response:Zaposlen)=>{
      this.nastavnik = response;
      this.forma_kabinet = this.nastavnik.broj_kabineta;
      this.forma_biografija = this.nastavnik.biografija;
      this.forma_telefon = this.nastavnik.telefon;
      this.forma_adresa = this.nastavnik.adresa;
      this.forma_ime = this.nastavnik.ime;
      this.forma_prezime = this.nastavnik.prezime;
      this.forma_zvanje = this.nastavnik.zvanje;

      this.dohvatiPredmeteNastavnika();
      this.dohvatiSpiskoveNastavnika();
      this.dohvatiVestiNastavnika();
    });
  }

  preuzmiFajl(ime_fajla){
    this.fajloviServis.preuzmiFajl(ime_fajla).subscribe(data=>saveAs(data, ime_fajla), error=> console.error(error));
  }
  
  dohvatiPredmeteNastavnika(){
    this.nastavnik.predmeti.forEach(p=>{
      this.predmetiServis.dohvatiPredmet(p.sifra).subscribe((p:Predmet)=>{
        this.predmeti.push(p);
      })
    })
  }
  
  dohvatiVestiNastavnika(){
    this.vestiServis.dohvatiVestiNastavnika(this.nastavnik._id).subscribe((v:Vest[])=>{
      this.vesti_nastavnika = v;
      this.vesti_nastavnika.forEach(v=>{
        v.datum = new Date(v.datum);
        v.datum_string = "" + v.datum.toLocaleDateString(undefined, {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'});
      })
    })
  }

  obrisiVest(id){
    this.vestiServis.obrisiVest(id).subscribe((p:Object)=>{
      this.dohvatiVestiNastavnika();
    })
  }

  dohvatiIzabraniPredmet(sifra){
    this.predmeti.forEach(p=>{
      if(p.sifra == sifra) {
        this.izabran_predmet = p;
        this.poruka = "";
        this.forma_uslov = this.izabran_predmet.uslov;
        this.forma_status = "" + this.izabran_predmet.tip;
        this.forma_cilj = this.izabran_predmet.cilj;
        this.forma_bodovi = this.izabran_predmet.bodovi;
        this.forma_sifra = this.izabran_predmet.sifra.toString();
        this.dohvatiSveFajlove();
        return;
      }
    }) 
    
  }

  izmeniPredmet(){
    this.predmetiServis.unesiOpsteIzmeneZaPredmet(this.izabran_predmet.sifra, this.forma_uslov, this.forma_status, this.forma_cilj, this.forma_bodovi, this.forma_sifra).subscribe((poruka:string)=>{
      this.poruka = poruka;
      window.location.reload();
    });
  }

  izmeniKorisnik(){
    this.korisniciServis.izmeniKorisnika(this.nastavnik._id, this.forma_ime, this.forma_prezime, this.forma_adresa, this.forma_kabinet, this.forma_zvanje, this.forma_telefon, this.forma_biografija).subscribe((poruka:string)=>{
      this.poruka = poruka;
      window.location.reload();
    });
  }

  odjava(){
    localStorage.setItem("korisnik","");
    localStorage.setItem("tip","");
    this.router.navigate([""]);
  }

  prikaziPrvu(){
    this.selected.setValue(1);
  }
}
