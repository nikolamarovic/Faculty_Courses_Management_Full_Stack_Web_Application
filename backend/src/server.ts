import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import korisnik from './model/korisnik';
import { ObjectId } from "mongodb";
import predmet from './model/predmet';
import obavestenje from './model/obavestenje';
import multer from 'multer'
import fajl from './model/fajl';
import path = require('path');
import vest from './model/vest';
import spisak from './model/spisak';
import student from './model/student';
import projekat from './model/projekat';

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/pia_projekat_db");
const conn = mongoose.connection;

conn.once('open',()=>{
    console.log("Uspesna konekcija.");
})

var store = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null,'./uploads');
    },
    filename:function(req, file, cb){
        cb(null, Date.now() + '.' + file.originalname);
    }
})

var upload = multer({storage:store}).single('file');

const router = express.Router();

router.route('/upload').post((req,res)=>{
    upload(req, res, function(err){
        if(err) console.log(err);
        else{
            let fajl_za_bazu = new fajl({
                _id:new ObjectId(),
                sifra_predmeta:req.body.sifra,
                ime:req.body.ime,
                prezime:req.body.prezime,
                naslov:req.body.naslov,
                tip_nastave:req.body.tip_nastave,
                tekst:req.body.tekst_fajla,
                ime_fajla_original:req.file.originalname,
                ime_fajla_upload:req.file.filename,
                velicina:req.body.velicina,
                datum: new Date(req.body.datum),
                tip_fajla:req.body.tip_fajla
            })
            fajl_za_bazu.save().then(succ=>{
                res.json(req.file.filename);
            }).catch(err=>{
                res.json({"poruka":"NIJE OK"})});
        }
    });
})

router.route('/ukloniPredmetIzZaposlenog').post((req, res)=>{
    let tmp_id = new ObjectId(req.body.id);
    korisnik.collection.updateOne({"_id":tmp_id},{$pull:{'predmeti':{"sifra":req.body.sifra}}})
})

router.route('/ukloniPredmetIzStudenta').post((req, res)=>{
    let tmp_id = new ObjectId(req.body.id);
    student.collection.updateOne({"_id":tmp_id},{$pull:{"predmeti":{"sifra":req.body.sifra}}});
})

router.route('/ukloniPredmetIzVesti').post((req, res)=>{
    let tmp_id = new ObjectId(req.body.id);
    console.log(req.body);
    vest.collection.updateOne({"_id":tmp_id},{$pull:{"predmeti":{"sifra":req.body.sifra}}});
})

router.route('/dodajVest').post((req, res)=>{
    let n_id = new ObjectId(req.body.nastavnik_id);
    let v =  new vest({
        _id:new ObjectId(),
        naslov_vesti:req.body.naslov,
        tekst_vesti:req.body.tekst,
        predmeti:req.body.predmeti,
        nastavnik:req.body.nastavnik,
        nastavnik_id:n_id,
        datum:new Date(req.body.datum),
        fajl:""
    })
    v.save().then((vest)=>{
        res.json(v._id);
    }).catch((err)=>{
        console.log(err);
        res.json({poruka:-1});
    })

    vest.collection.updateOne({"_id":v._id},{$push:{"predmeti":req.body.predmeti}});
})

router.route('/dohvatiVestiZaPredmet').post((req, res)=>{
    vest.find({"predmeti.sifra":req.body.sifra},(err, v)=>{
        if(err) console.log(err);
        else res.json(v);  
    })
})

router.route('/obrisiVest').post((req, res)=>{
    let id = new ObjectId(req.body.id);
    vest.deleteOne({"_id":id},(err)=>{
        if(err) console.log(err);
        else res.json({"poruka":1});
    })
})

router.route('/dohvatiGrupeNaPredmetuZaNastavnika').post((req, res)=>{
    console.log(req.body.sifra);
    console.log(req.body.kor_ime);
    predmet.find({"sifra":req.body.sifra, "grupa.angazovani.kor_ime":req.body.kor_ime},(err, predmet)=>{
        if(err) console.log(err);
        else{
            console.log(predmet);
            res.json(predmet);
        }
    })
})

router.route('/dohvatiSpiskoveNastavnika').post((req, res)=>{
    let tmp = new ObjectId(req.body.id);
    spisak.find({"nastavnik_id":tmp},(err,s)=>{
        if(err) console.log(err);
        else res.json(s);
    })
})

router.route('/promeniStatusSpisku').post((req, res)=>{
    let tmp = new ObjectId(req.body.spisak_id);

    spisak.collection.updateOne({"_id":tmp},{$set:{"status":req.body.status}});
    res.json({'poruka':1});
})

router.route('/dodajSpisak').post((req, res)=>{
    let tmp_array = Array<Object>();
    let s = new spisak({
        _id: new ObjectId(),
        naziv_spiska:req.body.naziv_spiska,
        nastavnik:req.body.nastavnik,
        nastavnik_id:req.body.id,
        predmet:req.body.predmet,
        istice:new Date(req.body.istice),
        grupe:tmp_array,
        status:"aktivan"
    });
    s.save().then((spisak_sacuvan)=>{
        res.json(spisak_sacuvan);
    }).catch((err)=>{
        console.log(err);
        res.json({poruka:-1});
    })
})

router.route('/dodajStudentaNaSpisak').post((req, res)=>{
    let id = new ObjectId(req.body.spisak_id);
    let g_id = req.body.grupa_id;
    let elem = 'grupe.'+g_id+'.studenti';
    let elem2 = 'grupe.'+g_id+'.broj_prijavljenih';
    let s_tmp = {
        student_id:req.body.id_s
    }
    spisak.collection.updateOne({"_id":id},{$push:{[elem]:s_tmp},$inc:{[elem2]:1}})
    res.json({"poruka":1});
})

router.route('/dohvatiStudente').post((req, res)=>{
    student.find({},(err,s)=>{
        if(err) console.log(err);
        else res.json(s);
    })
})

router.route('/promeniVidljivostLab').post((req, res)=>{
    predmet.collection.updateOne({"sifra":req.body.sifra},{$set:{"lab_sakriven":req.body.vidljivost}});
    res.json({'poruka':1});
})

router.route('/promeniVidljivostProjekat').post((req, res)=>{
    predmet.collection.updateOne({"sifra":req.body.sifra},{$set:{"projekat_sakriven":req.body.vidljivost}});
    res.json({'poruka':1});
})

router.route('/promeniVidljivostRokovi').post((req, res)=>{
    predmet.collection.updateOne({"sifra":req.body.sifra},{$set:{"rokovi_sakriven":req.body.vidljivost}});
    res.json({'poruka':1});
})

router.route('/dodajPredmetStudentu').post((req, res)=>{
    let tmp = new ObjectId(req.body.id);
    let s = {
        sifra:req.body.sifra
    }
    student.collection.updateOne({"_id":tmp},{$push:{predmeti:s}})
    res.json({'poruka':'1'});
})

router.route('/dodajZaposlenogNaPredmet').post((req, res)=>{
    let sifra_predmeta = req.body.sifra;
    let elem = 'grupa.'+req.body.grupa+'.angazovani';
    let a = {
        ime:req.body.ime,
        prezime:req.body.prezime,
        kor_ime:req.body.kor_ime
    }
    predmet.collection.updateOne({"sifra":sifra_predmeta},{$push:{[elem]:a}})
    res.json({"poruka":'1'});
});

router.route('/dodajPredmetZaposlenom').post((req, res)=>{
    let tmp_id = new ObjectId(req.body.id);
    let p = {
        sifra:req.body.sifra,
        grupa:req.body.grupa
    }
    korisnik.collection.updateOne({"_id":tmp_id},{$push:{"predmeti":p}});
    res.json({'poruka':'1'});
    
})

router.route('/izbaciZaposlenogSaPredmeta').post((req, res)=>{
    let sifra_predmeta = req.body.sifra;
    let kor_ime = req.body.kor_ime;
    let elem = 'grupa.' + req.body.grupa + '.angazovani';
    console.log(req.body);
    console.log("Izbacujem zaposlenog " + req.body.kor_ime + " sa predmeta " + req.body.sifra);
    predmet.collection.updateOne({"sifra":sifra_predmeta},{$pull:{[elem]:{"kor_ime":kor_ime}}});

    korisnik.collection.updateOne({"korisnicko_ime":req.body.kor_ime},
        {$pull:{"predmeti":{"sifra":sifra_predmeta,"grupa":req.body.grupa_ime}}});

    res.json({"poruka":'1'});
});

router.route('/obrisiStudentaSaSpiska').post((req, res)=>{
    let id = new ObjectId(req.body.spisak_id);
    let g_id = req.body.grupa_id;
    let student_id = req.body.id_s;

    let tmp = 'grupe.'+g_id+'.studenti';
    let elem = 'grupe.'+g_id+'.broj_prijavljenih';
    spisak.collection.updateOne({"_id":id},{$pull:{[tmp]:{"student_id":student_id}}});
    spisak.collection.updateOne({"_id":id},{$inc:{[elem]:-1}});
    res.json({'poruka':1});
})

router.route('/obrisiSpisakStudentu').post((req, res)=>{
    student.collection.updateOne({"korisnicko_ime":req.body.kor_ime},{$pull:{"spiskovi":{"spisak_id":req.body.spisak_id}}})
    res.json({"poruka":'1'});
})

router.route('/dohvatiAktivneSpiskoveNaPredmetu').post((req, res)=>{
    spisak.find({"predmet":req.body.sifra,"status":"aktivan"},(err,s)=>{
        if(err) console.log(err);
        else res.json(s);
    })
})

router.route('/dohvatiSpisakSaId').post((req, res)=>{
    let id = new ObjectId(req.body.id);
    spisak.findOne({"_id":id},(err, s)=>{
        if(err) console.log(err);
        else{
            res.json(s);
        }
    })
})

router.route('/dodajGrupuUTermin').post((req, res)=>{
    let spisak_id = new ObjectId(req.body.indeks_spiska);
    let tmp_array = Array<Object>();
    let grupa = {
        id:req.body.indeks_grupe,
        ime:req.body.ime_grupe,
        mesto_odrzavanja:req.body.mesto,
        vreme_odrzavanja:new Date(req.body.vreme),
        broj_prijavljenih:0,
        limit:req.body.limit,
        studenti:tmp_array
    }
    spisak.collection.updateOne({"_id":spisak_id},{$push:{"grupe":grupa}});
    res.json({"poruka":1})
})

router.route('/dohvatiVestiNastavnika').post((req, res)=>{
    let id = new ObjectId(req.body.id);
    vest.find({"nastavnik_id":id},(err,v)=>{
        if(err) console.log(err);
        else res.json(v);
    })
})

router.route('/upload_vest').post((req,res)=>{
    upload(req, res, function(err){
        if(err) console.log(err);
        else{
           
           
        }
    });
})

router.route('/dodajFajlUVest').post((req, res)=>{
    let id = new ObjectId(req.body.id);
    vest.collection.updateOne({"_id":id},{$set:{"fajl":req.body.fajl}});
})
router.route('/promeniLozinku').post((req, res)=>{
    let id_tmp = new ObjectId(req.body.student);
    student.collection.updateOne({"_id":id_tmp},{$set:{"lozinka":req.body.lozinka}});
    res.json({"poruka":1});
})

router.route('/registrujStudenta').post((req, res)=>{
    let st = req.body.student;
    let id_tmp = new ObjectId();
    let tmp_array1 = new Array<Object>();
    let tmp_array2 = new Array<Object>();
    let s = new student({
        _id:id_tmp,
        korisnicko_ime:st.korisnicko_ime,
        lozinka:st.lozinka,
        indeks:st.indeks,
        ime:st.ime,
        prezime:st.prezime,
        tip_studija:st.tip_studija,
        status:st.status,
        predmeti:tmp_array1,
        spiskovi:tmp_array2
    });
    
    s.save().then((s: any)=>{
        res.json(s);
    }).catch((err: any)=>{
        console.log(err);
        res.json({poruka:-1});
    })
})

router.route('/dodajFajlUPredmet').post((req, res)=>{
    let fajl_predmet = {
        naslov:req.body.naslov,
        ime_fajla_upload:req.body.ime_fajla,
        tip_fajla:req.body.tip_fajla,
        tip_nastave:req.body.tip_nastave,
        tekst:req.body.tekst
    }
    predmet.collection.updateOne({"sifra":req.body.sifra}, {$push:{"materijali": fajl_predmet}
    })
})

router.route('/download').post((req, res)=>{
    let filepath = path.join(__dirname,'../uploads') + '/' + req.body.filename;
    res.sendFile(filepath);
});

router.route('/dodajKorisnika').post((req, res)=>{
    let k = new korisnik(req.body);
    let p = new Array<Object>();
    k._id = new ObjectId();
    k.save().then((k)=>{
        res.json({"poruka":"Korisnik uspešno dodat."});
    }).catch((err)=>{
        console.log(err);
    })
})

router.route('/dohvatiFajlSaImenom').post((req, res)=>{
    fajl.findOne({"ime_fajla_upload":req.body.ime},(err, f)=>{
        if(err) console.log(err);
        else {
            console.log(f);
            res.json(f);
        }
    })
})
router.route('/dohvatiSveFajloveNaPredmetu').post((req, res)=>{
    let sifra = req.body.sifra_predmeta;
    predmet.find({"sifra":req.body.sifra_predmeta},(err,p)=>{
        if(err) console.log(err);
        else{
            console.log(p);
        }
    })
    fajl.find({"sifra_predmeta":sifra},(err, fajlovi)=>{
        if(err)console.log(err);
        else{
            console.log(fajlovi);
            res.json(fajlovi);
        }
    })
})

router.route('/dohvatiPredmeteNaOdseku').post((req, res)=>{
    let odsek = req.body.odsek;
    predmet.find({"odsek":odsek}, (err, p)=>{
        if(err) console.log(err);
        else res.json(p);
    })
})

router.route('/zaposleni').get((req, res)=>{
    korisnik.find({},(err, zaposleni)=>{
        if(err) console.log(err);
        else res.json(zaposleni);
    })
})

router.route('/dohvatiSvaObavestenja').get((req, res)=>{
    obavestenje.find({},(err,o)=>{
        if(err) console.log(err);
        else res.json(o);
    })
})

router.route('/obrisiObavestenje').post((req, res)=>{
    let id = new ObjectId(req.body.id);
    obavestenje.collection.deleteOne({"_id":id});
    res.json({'poruka':1});
})

router.route('/dodajObavestenje').post((req, res)=>{
    let o = new obavestenje(req.body);
    o._id = new ObjectId();
    o.save().then(ob=>{
        res.json({'poruka':1});
    }).catch(err=>{
        console.log(err);
    })
})

router.route('/obrisiKorisnika').post((req, res)=>{
    let id = new ObjectId(req.body.id);
    korisnik.collection.deleteOne({"_id":id});
    res.json({'poruka':1});
})

router.route('/obrisiPredmet').post((req, res)=>{
    predmet.collection.deleteOne({"sifra":req.body.sifra});
    res.json({'poruka':1});
})

router.route('/dohvatiPredmete').get((req, res)=>{
    predmet.find({},(err,p)=>{
        if(err) console.log(p);
        else res.json(p);
    })
})

router.route('/dohvatiProjekte').get((req, res)=>{
    projekat.find({},(err,p)=>{
        if(err) console.log(p);
        else res.json(p);
    })
})

router.route('/dodajGrupuUPredmet').post((req, res)=>{
    let g = {
        ime_grupe:req.body.grupa,
        termin:req.body.termin,
        angazovani: new Array<Object>()
    }
    predmet.collection.updateOne({"sifra":req.body.sifra},{$push:{"grupa":g}});
    res.json({'poruka':'1'});
})

router.route('/dodajPredmet').post((req, res)=>{
    let p = new predmet(req.body);
    p._id = new ObjectId();
    p.save().then((predmet)=>{
        res.json({'poruke':1});
    }).catch((err) =>{
        console.log(err)}
    );
})
router.route('/prijava').post((req,res)=>{
    let kor_ime = req.body.kor_ime;
    let lozinka = req.body.lozinka;
    let st = req.body.student;
    if(st == 1){
        student.findOne({"lozinka":lozinka,"korisnicko_ime":kor_ime},(err: any, k: any)=>{
            if(err) console.log(err);
            else res.json(k);
        })
    }else{
        korisnik.findOne({"lozinka":lozinka,"korisnicko_ime":kor_ime},(err, k)=>{
            if(err) console.log(err);
            else res.json(k);
        })
    }    
})

router.route('/dohvatiStudentaPoId').post((req, res)=>{
    let tmp_id = new ObjectId(req.body.id);
    student.findOne({"_id":tmp_id},(err, s)=>{
        if(err) console.log(err);
        else res.json(s);
    })
})

router.route('/dohvatiStudentaPoKorImenu').post((req, res)=>{
    student.findOne({"korisnicko_ime":req.body.kor_ime},(err, s)=>{
        if(err) console.log(err);
        else res.json(s);
    })
})

router.route('/dodajSpisakStudentu').post((req, res)=>{
    let spisak = {
        spisak_id:req.body.spisak_id,
        grupa_id:req.body.grupa_id
    }
    student.collection.updateOne({"korisnicko_ime":req.body.kor_ime},{$push:{"spiskovi":spisak}});
    res.json({'poruka':1});
})



router.route('/dohvatiPredmet').post((req, res)=>{
    let sifra = req.body.sifra;
    predmet.findOne({"sifra":sifra}, (err, p)=>{
        if(err) console.log(err);
        else res.json(p);
    })
})

router.route('/opsteIzmenePredmet').post((req, res)=>{
    predmet.collection.updateOne({"sifra":req.body.stara_sifra},{
        $set:{
            "sifra":req.body.sifra, 
            "uslov":req.body.uslov,
            "bodovi":req.body.bodovi,
            "cilj":req.body.cilj,
            "tip":req.body.status
        }
    });
    res.json("OK");
})

router.route('/opsteIzmeneKorisnik').post((req, res)=>{
    let id = new ObjectId(req.body.id);
    korisnik.collection.updateOne({"_id":id},
    {$set:{
        "ime":req.body.ime,
        "prezime":req.body.prezime,
        "adresa":req.body.adresa,
        "telefon":req.body.telefon,
        "biografija":req.body.biografija,
        "zvanje":req.body.zvanje,
        "broj_kabineta":req.body.broj_kabineta
        }
    });
    res.json("OK");
})

router.route('/dohvatiPredmetePoOdsekuISemestru').post((req, res)=>{
    let odsek = req.body.odsek;
    let semestar = req.body.semestar;
    predmet.find({"odsek":odsek, "semestar":semestar}, (err, p)=>{
        if(err) console.log(err);
        else res.json(p);
    })
})

router.route('/dohvatiKorisnikaPoId').post((req, res)=>{    
    let id = new ObjectId(req.body.kor_id);
    korisnik.findOne({"_id": id}, (err, k)=>{
        if(err) console.log(err);
        else res.json(k);
    })
})

router.route('/dohvatiPredmeteNastavnika').post((req,res)=>{
    let kor_ime = req.body.kor_ime;
    predmet.find({"angazovani.kor_ime":kor_ime},(err, p)=>{
        if(err) console.log(err);
        else res.json(p);
    })
})

router.route('/dohvatiKorisnikaPoKorImenu').post((req,res)=>{
    let kor_ime = req.body.kor_ime;
    korisnik.findOne({"korisnicko_ime":kor_ime}, (err, k)=>{
        if(err) console.log(err);
        else res.json(k);
    })
})

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));