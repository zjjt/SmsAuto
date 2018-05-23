import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import ApolloClient,{createNetworkInterface} from 'apollo-client';
import adminReducer from './reducers/admin-reducer';
import userReducer from './reducers/user-reducer';
import { meteorClientConfig } from 'meteor/apollo';

const networkInterface=createNetworkInterface({
	uri:'/graphql',
	credentials:'same-origin'//pour dire kils sont sur le meme domaine
});
const client= new ApolloClient(networkInterface);
const reducers={
	form:formReducer,
	apollo:client.reducer(),
	administrateurAction:adminReducer,
	user:userReducer
};

const rootReducer=combineReducers(reducers);
export {client,rootReducer};