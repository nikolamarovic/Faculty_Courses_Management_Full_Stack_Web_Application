import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Vest = new Schema({
    _id:{
        type:Object
    },
    naslov_vesti:{
        type:String
    },
    tekst_vesti:{
        type:String
    },
    predmeti:{
        type:Array
    },
    nastavnik:{
        type:String
    },
    nastavnik_id:{
        type:Object
    },
    datum:{
        type:Date
    },
    fajl:{
        type:Object
    }
})

export default mongoose.model("Vest", Vest, 'vesti');

