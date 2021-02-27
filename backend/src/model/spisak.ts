import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let Spisak = new Schema({
    _id:{
        type:Object
    },
    naziv_spiska:{
        type:String
    },
    nastavnik:{
        type:String
    },
    nastavnik_id:{
        type:String,
    },
    predmet:{
        type:String
    },
    grupe:{
        type:Array
    },
    istice:{
        type:Date
    },
    status:{
        type:String
    }
})

export default mongoose.model('Spisak', Spisak, 'spiskovi');