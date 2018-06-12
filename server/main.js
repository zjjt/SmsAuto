import { Meteor } from 'meteor/meteor';
import '../imports/startup/server/index';
import methods from './methods';
var schedule = require('node-schedule');


Meteor.startup(() => {
  // code to run on server at startup
  methods();
  Meteor.call('cleanerSymtel');
  
});

var w = schedule.scheduleJob('00 17 * * *',function(){
  Meteor.call('smsAnniversaireToXLS');
      console.log("done extracting sms file at "+Date.now() );
});