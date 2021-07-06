import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  prikazi_zaposlen: boolean;
  prikazi_student: boolean;
  prikazi_admin:boolean;
  id:string;
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.id = localStorage.getItem("korisnik");
    if(this.id){
      if(this.id != ""){
        if(localStorage.getItem("tip") == '0'){
          this.prikazi_zaposlen = true;
          this.prikazi_student = false;
          this.prikazi_admin = false;
        } 
        else if(localStorage.getItem("tip") == '1'){
          this.prikazi_student = true;
          this.prikazi_zaposlen = false;
          this.prikazi_admin = false;
        }else if(localStorage.getItem("tip")=='3'){
          this.prikazi_student = false;
          this.prikazi_zaposlen = false;
          this.prikazi_admin = true;
        } 
      } 
      else{
        this.prikazi_student = false;
        this.prikazi_zaposlen = false;
      } 
    }else{
      this.prikazi_student = false;
      this.prikazi_zaposlen = false;
    }
  }
  
}
