import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let Korisnik = new Schema({
    _id:{
        type:Object
    },
    korisnicko_ime:{
        type:String
    },
    lozinka:{
        type:String
    },
    mejl:{
        type:String
    },
    ime:{
        type:String
    },
    prezime:{
        type:String
    },
    adresa:{
        type:String
    },
    telefon:{
        type:String
    },
    sajt:{
        type:String
    },
    biografija:{
        type:String
    },
    zvanje:{
        type:String
    },
    broj_kabineta:{
        type:String
    },
    status:{
        type:String
    },
    tip:{
        type:String
    },
    predmeti:{
        type:Array
    },
    slika:{
        type:String
    }
})

export default mongoose.model('Korisnik', Korisnik, 'korisnici');