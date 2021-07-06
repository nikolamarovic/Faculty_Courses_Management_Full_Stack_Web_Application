import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AboutHomeComponent } from './home/about-home/about-home.component';
import { HomeComponent } from './home/home.component';
import { KontaktComponent } from './kontakt/kontakt.component';
import { MasterComponent } from './master/master.component';
import { NastavnikComponent } from './nastavnik/nastavnik.component';
import { ObavestenjaComponent } from './obavestenja/obavestenja.component';
import { OdsekComponent } from './odsek/odsek.component';
import { PredmetComponent } from './predmet/predmet.component';
import { ProjektiComponent } from './projekti/projekti.component';
import { StudentComponent } from './student/student.component';
import { ZaposlenComponent } from './zaposlen/zaposlen.component';
import { ZaposleniComponent } from './zaposleni/zaposleni.component';


const routes: Routes = [
  
  {path:"",component:HomeComponent},
  {path:"obavestenja", component:ObavestenjaComponent},
  {path:"zaposleni", component:ZaposleniComponent},
  {path:"odsek/:id", component:OdsekComponent},
  {path:"predmet/:sifra", component:PredmetComponent},
  {path:"kontakt",component:KontaktComponent},
  {path:"projekti",component:ProjektiComponent},
  {path:"zaposlen/:id", component:ZaposlenComponent},
  {path:"master", component:MasterComponent},
  {path:"admin", component:AdminComponent},
  {path:":id", component:NastavnikComponent},
  {path:"student/:id", component:StudentComponent},
  {path:"**",component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }