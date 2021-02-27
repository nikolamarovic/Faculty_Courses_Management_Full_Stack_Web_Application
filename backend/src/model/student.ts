import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let Student = new Schema({
    _id:{
        type:Object
    },
    korisnicko_ime:{
        type:String
    },
    lozinka:{
        type:String
    },
    indeks:{
        type:String
    },
    ime:{
        type:String
    },
    prezime:{
        type:String
    },
    status:{
        type:String
    },
    tip_studija:{
        type:String
    },
    predmeti:{
        type:Array
    },
    spiskovi:{
        type:Array
    }
})

export default mongoose.model('Student', Student, 'studenti');