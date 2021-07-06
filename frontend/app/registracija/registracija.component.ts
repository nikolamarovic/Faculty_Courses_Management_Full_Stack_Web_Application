import { Component, OnInit } from '@angular/core';
import { Student } from '../model/student.model';
import { StudentSpisak } from '../model/studentSpisak.model';
import { KorisniciService } from '../servisi/korisnici.service';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {
  student:Student;
  hide:boolean; 
  stara_lozinka:string;
  nova_lozinka1:string;
  nova_lozinka2:string;
  poruka_lozinka:string;
  
  promena_lozinke:boolean;
  constructor(private korisniciServis:KorisniciService) { }
  
  ngOnInit(): void {
    this.hide = true;
    this.promena_lozinke = false;
    this.student = {} as Student;
    this.poruka_lozinka = "";
  }

  registracija(){
    console.log(this.student);
    let ime = this.student.ime;
    let prezime = this.student.prezime;
    this.student.korisnicko_ime = (this.student.prezime.charAt(0) + "" + this.student.ime.charAt(0) + this.student.indeks.slice(2,9).replace('/','') + this.student.tip_studija + "@student.etf.rs").toLowerCase();


    this.student.lozinka = ime.toUpperCase() + "" + prezime.toUpperCase();

    this.student.status = 'aktivan';
    this.student.predmeti = [] as Array<{sifra:string}>;
    this.student.spiskovi = [] as Array<StudentSpisak>;
    this.korisniciServis.registrujStudenta(this.student).subscribe((s:Student)=>{
      this.student = {} as Student;
      this.student = s;
      this.promena_lozinke = true;
    })
  }

  promeniLozinku(){
    if(this.stara_lozinka == this.student.lozinka){
      if(this.nova_lozinka1 == this.nova_lozinka2){
        this.korisniciServis.promeniLozinku(this.nova_lozinka1, this.student._id).subscribe((p:Object)=>{
          if(p['poruka']==1){
            this.poruka_lozinka = "Lozinka uspesno promenjena.";
            alert("Lozinka uspešno promenjena!");
            location.reload();
          }
        })
      }else this.poruka_lozinka = "Ne poklapaju se lozinke."  
    }else this.poruka_lozinka = "Niste dobro uneli staru lozinku."
    
  }

}
