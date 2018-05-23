import {Meteor} from 'meteor/meteor';
import DBSQLSERVER from './connectors.js';
import Sequelize from 'sequelize';
//import Future from 'fibers/future';
//console.log(typeof DBSQLSERVER+"kkkkk");
    DBSQLSERVER.sync();
    DBSQLSERVER.authenticate().then(()=>{
        console.log('Connection MsSql etablie');
    }).catch(()=>{
        console.log('Impossible de se connecter a MsSql,veuillez reverifier');
    });



const resolvers={
    Query:{
        itWorks(root,args,context){
            return "Graphql is one hell of a ride";
        }
    }
}

export default resolvers;