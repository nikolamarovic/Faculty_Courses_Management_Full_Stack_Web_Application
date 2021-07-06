import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Predmet } from '../model/predmet.model';
import { Student } from '../model/student.model';
import { KorisniciService } from '../servisi/korisnici.service';
import { PredmetiService } from '../servisi/predmeti.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  selected = new FormControl(0);
  student:Student;
  predmeti:Array<Predmet>

  constructor(private router:Router, private korisniciServis:KorisniciService, private predmetiServis:PredmetiService) { }

  ngOnInit(): void {
    this.student = {} as Student;
    this.predmeti = [] as Array<Predmet>;

    if(localStorage.getItem("korisnik")!="" && localStorage.getItem("tip")=='1'){
      this.dohvatiStudenta(localStorage.getItem('korisnik'));
    }else{
      this.router.navigate([""]);
    }
    
  }

  dohvatiStudenta(id){
    this.korisniciServis.dohvatiStudentaPoId(id).subscribe((s:Student)=>{
      this.student = s;
      this.student.predmeti.forEach(p=>{
        this.predmetiServis.dohvatiPredmet(p.sifra).subscribe((predmet:Predmet)=>{
          this.predmeti.push(predmet);
        })
      })
    })
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
