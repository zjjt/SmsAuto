import {FlowRouter} from 'meteor/ostrio:flow-router-extra';
import {Meteor} from 'meteor/meteor';
import {mount} from 'react-mounter';
import React from 'react';
import store from '../../redux/store.js'
import MainLayout from '../../ui/layouts/MainLayout/MainLayout.jsx';
import Dashboard from '../../ui/pages/Dashboard';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Session} from 'meteor/session';




injectTapEventPlugin();

FlowRouter.route('/',{
	name:'home',
	action(){
		mount(MainLayout,
			{content:()=><Dashboard/>});	
	}
});