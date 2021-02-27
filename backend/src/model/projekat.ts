import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Projekat = new Schema({
    _id:{
        type:Object
    },
    naslov:{
        type:String
    },
    tekst:{
        type:String
    },
    zaposlen:{
        type:Array
    }
})

export default mongoose.model("Projekat", Projekat, 'projekti');

