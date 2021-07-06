import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../model/student.model';
import { Zaposlen } from '../model/zaposlen.model';
import { KorisniciService } from '../servisi/korisnici.service';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css']
})
export class PrijavaComponent implements OnInit {
  hide:boolean;
  kor_ime:string;
  lozinka:string;
  korisnik:Zaposlen;
  student:boolean;
  poruka:string;

  constructor(private korisniciServis:KorisniciService, private router:Router) { }

  ngOnInit(): void {
    this.student= false;
    this.poruka = "";
    this.hide = true;
  }
  
  prijava(){
    let tmp = -1;
    if(this.student) tmp = 1;
    else tmp = 0;

    if(this.kor_ime == "admin" && this.lozinka == "admin"){  
      localStorage.setItem("korisnik","admin");
      localStorage.setItem("tip","3");
      this.router.navigate(['admin']);
    }else{
      this.korisniciServis.prijava(this.kor_ime, this.lozinka, tmp).subscribe((response:Object)=>{
        if(response != undefined){
          if(this.student){
            localStorage.setItem("korisnik", "" + (<Student>response)._id);
            localStorage.setItem("tip",'1');
            this.router.navigate(['student',(<Student>response)._id]);
          }else{
            localStorage.setItem("korisnik", "" + (<Zaposlen>response)._id);
            localStorage.setItem("tip",'0');
            this.router.navigate(['',(<Zaposlen>response)._id]);
          }
        }else{
          this.poruka = 'Losi podaci.';
        }
      })
    }
  }
}
