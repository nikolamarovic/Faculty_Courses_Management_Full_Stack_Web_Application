import { Component, OnInit } from '@angular/core';
import Obavestenje from '../model/obavestenje';
import { ObavestenjaService } from '../servisi/obavestenja.service';

@Component({
  selector: 'app-obavestenja',
  templateUrl: './obavestenja.component.html',
  styleUrls: ['./obavestenja.component.css']
})
export class ObavestenjaComponent implements OnInit {

  obavestenja:Obavestenje[];
  constructor(private obavestenjeServis:ObavestenjaService) { }

  ngOnInit(): void {
    this.obavestenja = [] as Obavestenje[];
    this.dohvatiObavestenja();
  }

  dohvatiObavestenja(){
    this.obavestenjeServis.dohvatiSvaObavestenja().subscribe((obavestenja_res:Obavestenje[])=>{
      
      let tmp = new Date('2020-11-25');
      obavestenja_res.forEach((o, index) =>{
        o.datum = new Date(o.datum);
        if(o.datum < tmp) obavestenja_res.splice(index);
      })

      this.obavestenja = obavestenja_res;
      this.obavestenja.sort((a,b)=>{
        if(a.datum > b.datum) return -1;
        if(b.datum>a.datum)return 1;
        if(a.datum==b.datum) return 0;
      })
    })
  }



}
