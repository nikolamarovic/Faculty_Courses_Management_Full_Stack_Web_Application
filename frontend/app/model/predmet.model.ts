import { Grupa } from "./grupa";
import { Materijal } from "./materijal.model";

export class Predmet{
    _id:number;
    sifra:String;
    fond:string;
    bodovi:number;
    tip:string;
    odsek:string;
    semestar:number;
    godina:number;
    naziv:string;
    cilj:string;
    uslov:string;
    materijali:Array<Materijal>;
    laboratorija:string;
    projekat:Object;
    komentar:Array<Object>;
    grupa:Array<Grupa>;
    angazovani:Array<String>;
    studenti:Array<Object>;
    lab_sakriven:string;
    projekat_sakriven:string;
    rokovi_sakriven:string;
}