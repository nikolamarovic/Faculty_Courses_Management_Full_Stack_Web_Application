import { StudentGrupaTermin } from "./student_grupa_termin";

export class GrupaTermin{
    id:number;
    ime:string;
    mesto_odrzavanja:string; 
    vreme_odrzavanja:Date; 
    vreme_odrzavanja_string:string; 
    broj_prijavljenih:number;
    limit:number;
    studenti:Array<StudentGrupaTermin>;
}