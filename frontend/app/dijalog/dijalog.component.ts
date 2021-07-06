import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  naslov: string;
  opis: string;
}

@Component({
  selector: 'app-dijalog',
  templateUrl: './dijalog.component.html',
  styleUrls: ['./dijalog.component.css']
})

export class DijalogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DijalogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }
}
