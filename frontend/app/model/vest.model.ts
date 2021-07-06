export class Vest{
    _id:number;
    naslov_vesti:string;
    tekst_vesti:string;
    predmeti:Array<{sifra:string}>;
    nastavnik:string;
    nastavnika_id:number;
    datum:Date;
    datum_string:string;
    fajl:Object;
}