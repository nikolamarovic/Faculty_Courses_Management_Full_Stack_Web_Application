import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Obavestenje from '../model/obavestenje';
import { Predmet } from '../model/predmet.model';
import { Student } from '../model/student.model';
import { Vest } from '../model/vest.model';
import { Zaposlen } from '../model/zaposlen.model';
import { KorisniciService } from '../servisi/korisnici.service';
import { ObavestenjaService } from '../servisi/obavestenja.service';
import { PredmetiService } from '../servisi/predmeti.service';
import { VestiService } from '../servisi/vesti.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  selected = new FormControl(0);
  zaposleni:Zaposlen[];
  predmeti:Predmet[];
  studenti:Student[];
  obavestenja:Obavestenje[];
  zvanja:Array<String>;
  zaposlen_forma_ime:string;
  zaposlen_forma_prezime:string;
  zaposlen_forma_adresa:string;
  zaposlen_forma_kor_ime:string;
  zaposlen_forma_lozinka:string;
  zaposlen_forma_mejl:string;
  zaposlen_forma_kabinet:string;
  zaposlen_forma_telefon:string;
  zaposlen_forma_sajt:string;
  zaposlen_forma_biografija:string;
  zaposlen_forma_zvanje:string;

  forma_status:string;
  forma_bodovi:number;
  forma_sifra:string;
  forma_uslov:string;
  forma_cilj:string;
  forma_naziv:string;
  forma_fond:string;
  forma_godina:string;
  forma_semestar:string;
  forma_odsek:string;

  obavestenje_kategorija:string;
  obavestenje_naziv:string;
  obavestenje_tekst:string;

  displayedColumns: string[] = ['ime', 'prezime', 'zvanje','brisanje'];
  dataSource: MatTableDataSource<Zaposlen>;

  izabran_predmet1:Predmet;
  izabran_predmet2:Predmet;
  izabran_zaposlen:Zaposlen;
  izabran_student:Student;
  grupa_prikaz:Array<Boolean>;

  ime_nove_grupe:string;
  termin_nove_grupe:string;
  studentNijeNaPredmetu:boolean;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private router:Router, private korisniciServis:KorisniciService, private predmetiServis:PredmetiService,
    private obavestenjaServis:ObavestenjaService, private vestiServis:VestiService) { }

  ngOnInit(): void {
    this.zvanja = [
      "redovni profesor", "vanredni profesor", "docent", 
      "asistent", "saradnik u nastavi", "istrazivac", 
      "laboratorijski inženjer","laboratorijski tehničar"
    ];
    this.zaposlen_forma_ime = "";
    this.zaposlen_forma_prezime= "";
    this.zaposlen_forma_adresa= "";
    this.zaposlen_forma_kor_ime= "";
    this.zaposlen_forma_lozinka= "";
    this.zaposlen_forma_mejl= "";
    this.zaposlen_forma_kabinet= "";
    this.zaposlen_forma_telefon= "";
    this.zaposlen_forma_sajt= "";
    this.zaposlen_forma_biografija= "";
    this.zaposlen_forma_zvanje= "";
    this.predmeti = [] as Array<Predmet>;
    this.zaposleni = [] as Array<Zaposlen>;
    this.studenti = [] as Array<Student>;
    this.obavestenja = [] as Array<Obavestenje>;
    this.izabran_predmet1 = {} as Predmet;
    this.izabran_predmet2 = {} as Predmet;
    this.izabran_zaposlen = {} as Zaposlen;
    this.izabran_student = {} as Student;
    this.grupa_prikaz = [] as Array<boolean>;
    this.studentNijeNaPredmetu = true;
    this.dohvatiPredmete();
    this.dohvatiObavestenja();
    this.dohvatiKorisnike();
    this.dohvatiStudente();
  }

  dohvatiStudente(){
    this.korisniciServis.dohvatiStudente().subscribe((s:Student[])=>{
      this.studenti = s;
    })
  }
  dohvatiPredmete(){
    this.predmetiServis.dohvatiPredmete().subscribe((p:Array<Predmet>)=>{
      this.predmeti = p;
    });
  }

  dodajKorisnika(){
    this.korisniciServis.dodajKorisnika(
      this.zaposlen_forma_ime,
      this.zaposlen_forma_prezime,
      this.zaposlen_forma_adresa,
      this.zaposlen_forma_kor_ime,
      this.zaposlen_forma_lozinka,
      this.zaposlen_forma_mejl,
      this.zaposlen_forma_kabinet,
      this.zaposlen_forma_telefon,
      this.zaposlen_forma_sajt,
      this.zaposlen_forma_biografija,
      this.zaposlen_forma_zvanje,
    ).subscribe((p:Object)=>{
      alert(p['poruka']);
      location.reload();
    })
  }

  dohvatiKorisnike(){
    this.korisniciServis.dohvatiSveZaposlene().subscribe((responseData:Zaposlen[])=>{
      this.zaposleni = responseData;
      this.dataSource = new MatTableDataSource(this.zaposleni); 
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  obrisiKorisnika(id){
    this.korisniciServis.obrisiKorisnika(id).subscribe((p:object)=>{
      this.dohvatiKorisnike();
    })
  }

  dodajPredmet(){
    this.predmetiServis.dodajPredmet(
      this.forma_naziv,
      this.forma_fond,
      this.forma_bodovi,
      this.forma_sifra,
      this.forma_godina,
      this.forma_semestar,
      this.forma_odsek,
      this.forma_status,
      this.forma_uslov,
      this.forma_cilj
    ).subscribe((p:Object)=>{
      if(p['poruke']==""+1){
        alert("Uspešno dodat predmet.");
      }
      location.reload();
    })
  }

  obrisiPredmet(predmet:Predmet){
    this.zaposleni.forEach(z=>{
      if(z.predmeti.length>0){
        this.korisniciServis.ukloniPredmetIzZaposlenog(z._id, predmet.sifra).subscribe((p:Object)=>{
          
        })
      }
    })

    this.studenti.forEach(s=>{
      if(s.predmeti.length>0){
        this.korisniciServis.ukloniPredmetIzStudenta(s._id, predmet.sifra).subscribe((p:Object)=>{
        })
      }
    })

    
    this.vestiServis.dohvatiVestiZaPredmet(predmet.sifra).subscribe((v:Vest[])=>{
      if(v.length>0){
        v.forEach(v1=>{
          this.vestiServis.ukloniPredmetIzVesti(v1._id, predmet.sifra).subscribe((v:Vest)=>{
          })
        })
      }
    })

    this.predmetiServis.obrisiPredmet(predmet.sifra).subscribe((p:Object)=>{ 
      this.dohvatiPredmete();
    })
  }

  dohvatiObavestenja(){
    this.obavestenjaServis.dohvatiSvaObavestenja().subscribe((o:Array<Obavestenje>)=>{
      this.obavestenja = o;
      this.obavestenja.forEach(o=>{
        o.datum = new Date(o.datum);
      })
    })
  }

  dohvatiIzabraniPredmet1(sifra){
    this.predmeti.forEach(p=>{
      if(p.sifra == sifra) {
        this.izabran_predmet1 = p;
        return;
      }
    }) 
  }

  dohvatiIzabraniPredmet2(sifra){
    this.predmeti.forEach(p=>{
      if(p.sifra == sifra) {
        this.izabran_predmet2 = p;
        return;
      }
    }) 
  }

  dohvatiIzabranogStudenta(id){
    this.studentNijeNaPredmetu = true;
    this.studenti.forEach(s=>{
      if(s._id == id){
        this.izabran_student = s;
      }
    })
    this.izabran_student.predmeti.forEach(p=>{
      if(p.sifra == this.izabran_predmet2.sifra){
        this.studentNijeNaPredmetu = false;
        return;
      } 
    })
  }

  dodajGrupuUPredmet(){
    alert(this.termin_nove_grupe + "" + this.ime_nove_grupe);
    this.predmetiServis.dodajGrupuUPredmet(this.izabran_predmet1.sifra, this.ime_nove_grupe, this.termin_nove_grupe).subscribe((p:Object)=>{
      location.reload()
    })
  }

  dohvatiIzabranogZaposlenog(id){
    if(id != undefined){
      this.izabran_predmet1.grupa.forEach((g,ind)=>{
        this.grupa_prikaz[ind] = false;
      })
  
      this.zaposleni.forEach(z=>{
        if(z._id == id){
          this.izabran_zaposlen = z;
          return;
        }
      })
  
      this.izabran_predmet1.grupa.forEach((g,ind)=>{
        g.angazovani.forEach(a=>{
          if(a.kor_ime == this.izabran_zaposlen.korisnicko_ime){
            this.grupa_prikaz[ind] = true;
          }
        })
      })
    }else{
      this.izabran_zaposlen = {} as Zaposlen;
    }
    
  }

  dodajZaposlenogNaPredmet(id_grupe, ime_grupe){
    this.korisniciServis.dodajZaposlenogNaPredmet(this.izabran_predmet1.sifra, this.izabran_zaposlen.korisnicko_ime, id_grupe, this.izabran_zaposlen.ime, this.izabran_zaposlen.prezime).subscribe((p:Object)=>{
      this.korisniciServis.dodajPredmetZaposlenom(this.izabran_zaposlen._id, this.izabran_predmet1.sifra,ime_grupe).subscribe((p:Object)=>{
        this.izabran_predmet1 = {} as Predmet;
        this.izabran_zaposlen = {} as Zaposlen;
        location.reload();
      })
    });
  }

  izbaciZaposlenogSaPredmeta(id_grupe, grupa_ime){
    this.korisniciServis.izbaciZaposlenogSaPredmeta(this.izabran_predmet1.sifra, this.izabran_zaposlen.korisnicko_ime,id_grupe, this.izabran_zaposlen.ime, this.izabran_zaposlen.prezime, grupa_ime).subscribe((p:Object)=>{
      
      this.izabran_predmet1 = {} as Predmet;
      this.izabran_zaposlen = {} as Zaposlen;
      location.reload();
    
    });
  }

  dodajStudentaNaPredmet(){
    this.korisniciServis.dodajPredmetStudentu(this.izabran_student._id,this.izabran_predmet2.sifra).subscribe((p:Object)=>{
      if(p['poruka']=='1') alert("Predmet uspesno dodat!");
      this.izabran_predmet2 = {} as Predmet;
      this.izabran_student = {} as Student;
      location.reload();
    })
  }

  dodajObavestenje(){
    this.obavestenjaServis.dodajObavestenje(this.obavestenje_naziv, this.obavestenje_kategorija, this.obavestenje_tekst).subscribe((p:Object)=>{
      this.dohvatiObavestenja();
      location.reload();
    })
  }

  obrisiObavestenje(id){
    this.obavestenjaServis.obrisiObavestenje(id).subscribe((p:Object)=>{
      this.dohvatiObavestenja();
    })
  }

  odjava(){
    localStorage.setItem("korisnik","");
    localStorage.setItem("tip","");
    this.router.navigate([""]);
  }
}
