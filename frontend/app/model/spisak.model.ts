import { GrupaTermin } from "./grupa_predmet.model";

export class Spisak{
    _id:number;
    naziv_spiska:string;
    nastavnik:string;
    nastavnik_id:string;
    predmet:string;
    grupe:Array<GrupaTermin>;
    status:String;
}