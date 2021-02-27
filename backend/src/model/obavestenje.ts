import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Obavestenje = new Schema({
    _id:{
        type:Object
    },
    kategorija:{
        type:String
    },
    naslov:{
        type:String
    },
    tekst:{
        type:String
    },
    datum:{
        type:Date
    }
})

export default mongoose.model("Obavestenje", Obavestenje, 'obavestenja');

