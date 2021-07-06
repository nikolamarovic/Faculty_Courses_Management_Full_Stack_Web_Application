import { Component, OnInit } from '@angular/core';
import { Projekat } from '../model/projekat';
import { ProjekatZaposlen } from '../model/ProjekatZaposlen';
import { ObavestenjaService } from '../servisi/obavestenja.service';

@Component({
  selector: 'app-projekti',
  templateUrl: './projekti.component.html',
  styleUrls: ['./projekti.component.css']
})
export class ProjektiComponent implements OnInit {
  projekti:Array<Projekat>;
  constructor(private obServis:ObavestenjaService) { }

  ngOnInit(): void {
    this.projekti = [] as Array<Projekat>;
    this.dohvatiProjekte();
  }
  dohvatiProjekte(){
    this.obServis.dohvatiProjekte().subscribe((p:Projekat[])=>{
      this.projekti = p;
    })
  }

}
