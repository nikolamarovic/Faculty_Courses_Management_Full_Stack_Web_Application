import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Fajl = new Schema({
    _id:{
        type:Object
    },
    sifra_predmeta:{
        type:String
    },
    ime:{
        type:String
    },
    prezime:{
        type:String
    },
    naslov:{
        type:String
    },
    tekst:{
        type:String
    },
    tip_nastave:{
        type:String
    },
    ime_fajla_original:{
        type:String
    },
    ime_fajla_upload:{
        type:String
    },
    velicina:{
        type:String
    },
    datum:{
        type:Date
    },
    tip_fajla:{
        type:String
    },
})

export default mongoose.model('Fajl',Fajl, 'fajlovi');

