import { ProjekatZaposlen } from "./ProjekatZaposlen";

export class Projekat{
    _id:number;
    naslov:string;
    tekst:string;
    zaposlen:Array<ProjekatZaposlen>;
}