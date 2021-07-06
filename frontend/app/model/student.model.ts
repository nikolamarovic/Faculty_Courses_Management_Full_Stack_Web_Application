import { StudentSpisak } from "./studentSpisak.model";

export class Student{
    _id:number;
    korisnicko_ime:string;//mejl
    lozinka:string;
    indeks:string;
    ime:string;
    prezime:string;
    status:string;
    tip_studija:string;
    predmeti:Array<{sifra:string}>;
    spiskovi:Array<StudentSpisak>;
}