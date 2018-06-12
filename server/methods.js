import {Meteor} from 'meteor/meteor';
import Sequelize from 'sequelize';
import DBSQLSERVER from '../imports/api/graphql/connectors.js';
import {moment} from 'meteor/momentjs:moment';
import {check} from 'meteor/check';
const R= require('ramda');
const fs=require('fs');
let Excel=require('exceljs');
let rimraf = require('rimraf');
//import Future from 'fibers/future';
import {ValidatedMethod} from 'meteor/mdg:validated-method';


export default ()=>{
    console.log("METHODS")
    Meteor.methods({
        getSmsDuJour(){

        },
        sendSms(typesms,numeros){
            //les envois sont fait selon les directives de l'api donc on peut en avoir une liste de numeros ou un seul numero 
        },
        executeAllSMS(){
           
        },
       async smsAnniversaireToXLS(){
            let workbook=new Excel.Workbook();
            workbook.creator='SMSAUTO';
                workbook.lastModifierdBy='SMSAUTO';
                workbook.created=new Date();
                workbook.modified = new Date();
                workbook.properties.date1904=true;
                workbook.views=[{
                    x:0,y:0,width:10000,height:20000,firstSheet:0,activeTab:1,visibility:'visible'
                }];
                let sheet=workbook.addWorksheet("sms aniverssaire du "+moment(new Date()).format("DD-MM-YYYY"));
                sheet.columns=[{
                    key:'N',
                    width:20
                },{
                    key:'M',
                    width:20 
                }];
            let query="exec dbo.info_sms_anniversaire";
            let regxp=/^\d+$/;
            let res=await DBSQLSERVER.query(query,{   
                type:DBSQLSERVER.QueryTypes.SELECT
            }).then(arr=>{
                if(arr.length){
                    let r=[];
                    arr.map((e,i,arr)=>{
                        if(e.CONTACT_ANNIVERSAIREUX.length==11 && regxp.test(e.CONTACT_ANNIVERSAIREUX) ){
                            sheet.addRow({
                                N:e.CONTACT_ANNIVERSAIREUX,
                                M:e.SMS,
                                });
                                r.push(e);
                            //console.dir(e);
                        }
                    })
                    //on cree le fichier excel et on l'ecris dans un volume
                    sheet.addRow({
                        N:'22559367811',
                        M:'les envois sms anniversaire du jour ont été éffectués',
                        });
                    
                    sheet.addRow({
                        N:'22509207887',
                        M:'les envois sms anniversaire du jour ont été éffectués',
                        });
                    return r;
                }else{
                    throw new Meteor.Error("error","Une erreur est survenue lors de l'execution de la requete des sms anniversaire.");  
                }
                
            }).catch((err)=>{
                //console.log(err);
               return err.reason;
            });

           if(res.length){
               console.dir(res);
               let dir = './sms';
                if (!fs.existsSync(dir)){
                    fs.mkdirSync(dir);
                }
               let filename="SMS_ANNIVERSAIRE_"+moment().format("DD-MM-YYYY")+".xlsx";
               let newres=await  workbook.xlsx.writeFile(dir+"/"+filename)
                            .then(function() {
                                console.log("FICHIER EXCEL SMS ANNIVERSAIRE OK");
                            });
           } 
        },
        cleanerSymtel(){
            rimraf('/sms',()=>{
                console.log("NETTOYAGE EFFECTUE");
            });
        },
         checkAdminUser(username,mdp){
            if(username===Meteor.settings.ADMINLOGMDP && mdp===Meteor.settings.ADMINLOGMDP)
                return true;
            else
                return false;
        }
    })
};

/*export default ()=>{
    let existInDB=new ValidatedMethod({
        name:'existInDB',
        validate:new SimpleSchema({
            nom:{type:String},
            prenom:{type:String},
            datenaissance:{type:String},
            numpolice:{type:String},
        }).validator(),
        mixins:[RestMethodMixin],
        restOptions:{
            url:'/passwordForgotten',
        },
        run({nom,prenom,datenaissance,numpolice}){
            let fut=new Future();
            //corps de la methode
            if(nom===""||!nom){
                throw new Meteor.Error("error","Nom du souscripteur vide");
                fut['return']({error:"Nom du souscripteur vide"});
            }else if(prenom===""||!prenom){
                //throw new Meteor.Error("error","Prénom(s) du souscripteur vide");
                fut['return']({error:"Prénom(s) du souscripteur vide"});
            }else if(!datenaissance||!Number.isInteger(parseInt(datenaissance,10))||datenaissance.length<8||datenaissance.length>8){
                //throw new Meteor.Error("error","Mauvaise date de naissance fournie");
                fut['return']({error:"Mauvaise date de naissance fournie"});
            }else if(!numpolice||!Number.isInteger(parseInt(numpolice,10))||numpolice.length<8||numpolice.length>8){
               // throw new Meteor.Error("error","Mauvais numéro de police fourni");
                fut['return']({error:"Mauvais numéro de police fourni"});
            }else{
                let NOM = nom.toUpperCase();
                let PRENOM= prenom.toUpperCase();
                let DATE_NAISSANCE=parseInt(datenaissance,10);
                let NUMERO_POLICE=parseInt(numpolice,10);
                let query=`select u.LOGIN,u.MOT_DE_PASSE,u.EMAIL,c.NOM_CLIENT+' '+c.PRENOMS_CLIENT as NOM_COMPLET,n.NUMERO_POLICE,c.TELEPHONE from utilisateur u 
                           JOIN CLIENT_UNIQUE c on u.IDE_CLIENT_UNIQUE = c.IDE_CLIENT_UNIQUE 
                           JOIN CONTRATS n on u.IDE_CLIENT_UNIQUE = n.IDE_CLIENT_UNIQUE 
                           WHERE c.NOM_CLIENT like :nc and c.PRENOMS_CLIENT like :pc and n.NUMERO_POLICE=:np and c.DATE_NAISSANCE=:dn`;
                let res=DBSQLSERVER.query(query,{
                    replacements:{
                        nc:NOM,
                        pc:PRENOM,
                        np:NUMERO_POLICE,
                        dn:DATE_NAISSANCE
                    },
                    type:DBSQLSERVER.QueryTypes.SELECT
                }).then(user=>{
                    if(user.length){
                        console.dir(user);
                        fut['return'](user);
                        //return user;
                    }else{
                        throw new Meteor.Error("error","Cet utilisateur est inexistant dans la base de données.Veuillez vous diriger vers le service clientèle.");  
                    }
                    
                }).catch((err)=>{
                    //console.log(err);
                    fut['return']({error:err.reason});
                   // return err.reason;
                });
               
            }
            
            return fut.wait(); 
        }
    });
};*/
