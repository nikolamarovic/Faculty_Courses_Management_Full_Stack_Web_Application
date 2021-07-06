import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CarouselComponent } from './carousel/carousel.component';
import { AboutHomeComponent } from './home/about-home/about-home.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { PrijavaComponent } from './prijava/prijava.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { ObavestenjaComponent } from './obavestenja/obavestenja.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { OdsekComponent } from './odsek/odsek.component';
import { MatTableModule } from '@angular/material/table';
import { PredmetComponent } from './predmet/predmet.component';
import { MasterComponent } from './master/master.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DijalogComponent } from './dijalog/dijalog.component';
import { ZaposleniComponent } from './zaposleni/zaposleni.component';
import { HttpClientModule } from '@angular/common/http'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ZaposlenComponent } from './zaposlen/zaposlen.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { NastavnikComponent } from './nastavnik/nastavnik.component';
import { MatSelectModule } from '@angular/material/select';
import { FileUploadModule } from 'ng2-file-upload';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'
import { MatCheckboxModule } from '@angular/material/checkbox';
import { StudentComponent } from './student/student.component';
import { AdminComponent } from './admin/admin.component';
import { KontaktComponent } from './kontakt/kontakt.component';
import { ProjektiComponent } from './projekti/projekti.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainMenuComponent,
    CarouselComponent,
    AboutHomeComponent,
    PrijavaComponent,
    RegistracijaComponent,
    ObavestenjaComponent,
    OdsekComponent,
    PredmetComponent,
    MasterComponent,
    DijalogComponent,
    ZaposleniComponent,
    ZaposlenComponent,
    NastavnikComponent,
    StudentComponent,
    AdminComponent,
    KontaktComponent,
    ProjektiComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatTabsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatExpansionModule,
    MatToolbarModule,
    MatTableModule,
    MatDialogModule,
    HttpClientModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatSelectModule,
    FileUploadModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
