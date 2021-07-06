import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Predmet } from '../model/predmet.model';
import { PredmetiService } from '../servisi/predmeti.service';

@Component({
  selector: 'app-odsek',
  templateUrl: './odsek.component.html',
  styleUrls: ['./odsek.component.css']
})
export class OdsekComponent implements OnInit {

  constructor(private route:ActivatedRoute, private predmetiServis:PredmetiService) { }
  
  id:string;
  prikaz:boolean;
  predmeti:Array<Predmet[]>;
  semestri:Array<number>;
  imeOdseka:string;
  
  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.id = params["id"];    
      this.prikaz = true;

      this.predmeti = [{}] as Array<Predmet[]>;
      this.semestri = [] as Array<number>;
      
      if(this.id=="rti"){
        this.imeOdseka = "Odsek za Računarsku tehniku i informatiku";
      } 
      if(this.id=="si"){
        this.imeOdseka = "Odsek za Softversko inženjerstvo";
      } 
      if(this.id=="ostali"){
        this.imeOdseka = "Ostali odseci";
      }
      for(let i=0; i < 8; i++){
        this.dohvatiPredmete(this.id, i+1);
        this.semestri[i] = i;
      }

    })
  }
  dohvatiPredmete(odsek, semestar){
    this.predmetiServis.dohvatiPredmetePoOdsekuISemestru(odsek, semestar).subscribe((response:Predmet[])=>{
      this.predmeti[semestar] = response;
    });
  }
}
