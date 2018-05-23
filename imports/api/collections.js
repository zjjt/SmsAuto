import {Meteor} from 'meteor/mongo';
import {Mongo} from 'meteor/mongo';

let Configurations=new Mongo.Collection('Configurations');
let Rapports=new Mongo.Collection('Rapports');
export {Configurations,Rapports};