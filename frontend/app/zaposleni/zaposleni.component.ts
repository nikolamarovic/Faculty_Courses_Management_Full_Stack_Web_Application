import { Component, OnInit } from '@angular/core';
import { Zaposlen } from '../model/zaposlen.model';
import { KorisniciService } from '../servisi/korisnici.service';

import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-zaposleni',
  templateUrl: './zaposleni.component.html',
  styleUrls: ['./zaposleni.component.css']
})
export class ZaposleniComponent implements OnInit {
  
  zaposleni:Zaposlen[];
  displayedColumns: string[] = ['ime', 'prezime', 'zvanje'];
  dataSource: MatTableDataSource<Zaposlen>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private korisniciServis:KorisniciService) { 
    
  }
  
  ngOnInit(): void {
    this.dohvSveZaposlene();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  dohvSveZaposlene(){
    this.korisniciServis.dohvatiSveZaposlene().subscribe((responseData:Zaposlen[])=>{
      this.zaposleni = responseData;
      this.dataSource = new MatTableDataSource(this.zaposleni); 
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
}
