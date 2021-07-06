import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DijalogComponent } from '../dijalog/dijalog.component';
import { Grupa } from '../model/grupa';
import { Materijal } from '../model/materijal.model';
import { Predmet } from '../model/predmet.model';
import { Zaposlen } from '../model/zaposlen.model';
import { FajloviService } from '../servisi/fajlovi.service';
import { KorisniciService } from '../servisi/korisnici.service';
import { PredmetiService } from '../servisi/predmeti.service';
import { saveAs } from 'file-saver'
import { Vest } from '../model/vest.model';
import { VestiService } from '../servisi/vesti.service';
import { SpiskoviService } from '../servisi/spiskovi.service';
import { Spisak } from '../model/spisak.model';
import { ObjectUnsubscribedError } from 'rxjs';
import { Student } from '../model/student.model';
import { GrupaTermin } from '../model/grupa_predmet.model';

@Component({
  selector: 'app-predmet',
  templateUrl: './predmet.component.html',
  styleUrls: ['./predmet.component.css']
})
export class PredmetComponent implements OnInit {

  constructor(
    private route:ActivatedRoute, 
    public dialog:MatDialog, 
    private predmetiServis:PredmetiService, 
    private korisniciServis:KorisniciService,
    private router:Router,
    private fajloviServis:FajloviService,
    private vestiServis:VestiService,
    private spiskoviServis:SpiskoviService
    ){ }
  
  predmet:Predmet;
  vesti:Vest[];
  student:Student;
  materijali_predavanja:Array<Materijal>;
  materijali_vezbe:Array<Materijal>;
  materijali_rokovi:Array<Materijal>;
  materijali_lab:Array<Materijal>;
  materijali_projekat:Array<Materijal>;
  materijali:Array<Materijal>;
  spiskovi:Array<Spisak>;
  spiskovi_prijavljen:Array<Spisak>;
  spiskovi_neprijavljen:Array<Spisak>
  ngOnInit(): void {
    this.predmet = {} as Predmet;
    this.vesti = [] as Vest[];
    this.materijali_predavanja = [] as Array<Materijal>;
    this.materijali_vezbe = [] as Array<Materijal>;
    this.materijali_rokovi = [] as Array<Materijal>;
    this.materijali_lab = [] as Array<Materijal>;
    this.materijali_projekat = [] as Array<Materijal>;
    this.spiskovi = [] as Array<Spisak>;
    this.spiskovi_prijavljen = [] as Array<Spisak>;
    this.spiskovi_neprijavljen = [] as Array<Spisak>;
    this.imeOdseka = "";
    this.student = {} as Student;
    this.route.params.subscribe(params=>{
      this.prikazi = true;
      if(localStorage.getItem("korisnik")!=""){
        this.dohvatiPredmet(params["sifra"]);
      }else{
        this.router.navigate([""]);
      }
      
    })
  }
  imeOdseka:string;
  prikazi:boolean;

  dohvatiPredmet(sifra:string){
    this.predmetiServis.dohvatiPredmet(sifra).subscribe((p:Predmet)=>{
      this.predmet = p;
      this.dohvatiStudenta(localStorage.getItem('korisnik'));
      this.dohvatiVesti();
      this.dohvatiAktivneSpiskove();
      
      if(this.predmet.odsek == 'si') this.imeOdseka = "Softversko inženjerstvo";
      if(this.predmet.odsek == 'rti') this.imeOdseka = "Računarska tehnika i informatika";
      if(this.predmet.odsek == 'ostali') this.imeOdseka = "Ostali odseci";
      this.materijali = [];
      this.predmet.materijali.forEach(m=>{
        this.materijali.push(<Materijal>m);
      })
      this.materijali_vezbe = [];
      this.materijali_predavanja = [];
      this.materijali_rokovi = [];
      this.materijali_lab = [];
      this.materijali_projekat = [];
     
      this.materijali.forEach(m=>{
        if(m.tip_nastave =='predavanja') this.materijali_predavanja.push(m); 
        if(m.tip_nastave =='vezbe') this.materijali_vezbe.push(m); 
        if(m.tip_nastave =='rokovi') this.materijali_rokovi.push(m); 
        if(m.tip_nastave =='lab') this.materijali_lab.push(m); 
        if(m.tip_nastave =='projekat') this.materijali_projekat.push(m); 
      })
    })
  }

  dohvatiStudenta(id){
    this.korisniciServis.dohvatiStudentaPoId(id).subscribe((s:Student)=>{
      this.student = s;
    })
  }

  dohvatiVesti(){
    this.vestiServis.dohvatiVestiZaPredmet(this.predmet.sifra).subscribe((v:Vest[])=>{
      this.vesti = v;
      this.vesti.forEach(v=>{
        v.datum = new Date(v.datum);
        v.datum_string = "" + v.datum.toLocaleDateString(undefined, {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'});
      })
      this.vesti = this.vesti.sort((a,b)=>{
        if(a > b) return 1;
        if(a==b) return 0;
        if(b>a) return -1;
      })
    });
  }

  preuzmiFajl(ime_fajla){
    this.fajloviServis.preuzmiFajl(ime_fajla).subscribe(data=>saveAs(data, ime_fajla), error=> console.error(error));
  }

  dohvatiAktivneSpiskove(){
    this.spiskoviServis.dohvatiAktivneSpiskoveZaPredmet(this.predmet.sifra).subscribe((s:Array<Spisak>)=>{
      this.spiskovi = s;
      this.spiskovi_prijavljen = [] as Array<Spisak>;
    this.spiskovi_neprijavljen = [] as Array<Spisak>
      this.spiskovi.forEach(s=>{
          let ok = false;
          if(this.student.spiskovi.length>0){
            this.student.spiskovi.forEach(st_spisak=>{
              if(st_spisak.spisak_id == "" + s._id) {
                this.spiskovi_prijavljen.push(s);
                ok = true;
              }
            })
            if(!ok) this.spiskovi_neprijavljen.push(s);
          }else {
            this.spiskovi_neprijavljen = this.spiskovi;
          }
          s.grupe.forEach(g=>{
            g.vreme_odrzavanja = new Date(g.vreme_odrzavanja);
            g.vreme_odrzavanja_string = g.vreme_odrzavanja.toLocaleDateString() + " " +g.vreme_odrzavanja.toLocaleTimeString();
          })
      })
    })
  }

  dodajNaSpisak(spisak_id, ime_grupe){
    this.spiskoviServis.dodajStudentaNaSpisak(spisak_id, ime_grupe,this.student.korisnicko_ime).subscribe((p:Object)=>{
      this.korisniciServis.dodajSpisakStudentu(this.student.korisnicko_ime,spisak_id,ime_grupe).subscribe((p:Object)=>{
        this.dohvatiAktivneSpiskove();
      });
    });
    location.reload();
  }

  odjaviSaSpiska(spisak_id, ime_grupe){
    this.spiskoviServis.obrisiStudentaSaSpiska(spisak_id, ime_grupe,this.student.korisnicko_ime).subscribe((p:Object)=>{
      this.korisniciServis.obrisiSpisakStudentu(this.student.korisnicko_ime,spisak_id).subscribe((p:Object)=>{
        this.spiskoviServis.dohvatiAktivneSpiskoveZaPredmet(this.predmet.sifra).subscribe((s:Array<Spisak>)=>{
          this.spiskovi = s;
        })
      })
      location.reload();
    });
  }

  preusmeriNaKorisnika(kor_ime){
    this.korisniciServis.dohvatiKorisnikaPoKorImenu(kor_ime).subscribe((k:Zaposlen)=>{
      this.router.navigate(['/zaposlen',k._id]);
    })
  }

  prikaziSpisak(){
    const dialogRef = this.dialog.open(DijalogComponent,{
      data:{naslov:"Cilj predmeta", opis:this.predmet.cilj}
    });
  }
}

