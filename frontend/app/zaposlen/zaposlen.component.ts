import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Predmet } from '../model/predmet.model';
import { Zaposlen } from '../model/zaposlen.model';
import { KorisniciService } from '../servisi/korisnici.service';
import { PredmetiService } from '../servisi/predmeti.service';

@Component({
  selector: 'app-zaposlen',
  templateUrl: './zaposlen.component.html',
  styleUrls: ['./zaposlen.component.css']
})
export class ZaposlenComponent implements OnInit {
  id: number;
  zaposlen:Zaposlen;
  predmeti:Predmet[];

  constructor(private korisniciServis:KorisniciService, private route:ActivatedRoute, private predmetiServis:PredmetiService) { }

  ngOnInit(): void {
    this.zaposlen = {} as Zaposlen;
    this.route.params.subscribe(params=>{
      this.id = params["id"];
    })
    this.predmeti = [] as Predmet[];
    this.inicijalizuj();
  }
  
  inicijalizuj(){
    this.korisniciServis.dohvatiKorisnikaPoId(this.id).subscribe((korisnik:Zaposlen)=>{
      this.zaposlen = korisnik;
      this.zaposlen.predmeti.forEach(p=>{
        this.predmetiServis.dohvatiPredmet(p.sifra).subscribe((p:Predmet)=>{
          this.predmeti.push(p);
        })
      })
    })
  }
}
