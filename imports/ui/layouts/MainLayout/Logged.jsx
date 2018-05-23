import React,{PropTypes,Component} from 'react';
import store from '../../../redux/store';
import {client} from '../../../redux/rootReducer.js';
//import {userconnected} from '../../../redux/actions/user-actions.js';
import {ApolloProvider} from 'react-apollo';
import {FlowRouter} from 'meteor/ostrio:flow-router-extra';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import {connect} from 'react-redux';
import {blue900} from 'material-ui/styles/colors';
import {Meteor} from 'meteor/meteor';
import {deconnection} from '../../../redux/actions/admin-actions.js';
import {createContainer} from 'meteor/react-meteor-data';
import {Mongo} from 'meteor/mongo';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {Session} from 'meteor/session';

 class Logged extends Component{
   componentDidUpdate(){
      
   }
    render(){
        console.dir("user loggs "+Meteor.userId());
        if(store.getState().administrateurAction.adminConnected){
            return(
            <IconMenu 
            {...this.props}
            iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
            targetOrigin={{horizontal:'right',vertical:'top'}}
            anchorOrigin={{horizontal:'right',vertical:'top'}}
            iconStyle={{color:'white'}}	
            >
                <MenuItem primaryText="Créer un utilisateur" onClick={()=>{FlowRouter.go('createUser')}}/>
                <MenuItem primaryText="Modifier un utilisateur" onClick={()=>{FlowRouter.go('listUser')}}/>
                
                <MenuItem primaryText="Déconnection" onClick={()=>{
                    store.dispatch(deconnection)
                    window.location.reload();
                    
                    
                }}/>
            </IconMenu> 
            );
        }else if(Meteor.userId()){
            
            const{data,dispatch}=this.props;
                 if(typeof data.user!=="undefined")
                {
                    store.dispatch(userconnected(data.user[0]));
                    Session.set("userRole",data.user[0].role);
                    Session.set("canshow",true);
                    console.dir(data);

                    if(data.user[0].role==="S"){
                    return(
                    <IconMenu 
                    {...this.props}
                    iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
                    targetOrigin={{horizontal:'right',vertical:'top'}}
                    anchorOrigin={{horizontal:'right',vertical:'top'}}
                    iconStyle={{color:'white'}}	
                    >
                        <MenuItem primaryText="Envoi de SMS spontan&eacute;" onClick={()=>{/*FlowRouter.go('dispo')*/}}/>
                        <MenuItem primaryText="Exporter vers Excel" onClick={()=>{FlowRouter.go('excel')}}/>
                        <MenuItem primaryText="Déconnection" onClick={()=>{
                            Meteor.logout(()=>{
                            Session.keys={};
                            FlowRouter.go('home');
                        });
                        }}/>
                    </IconMenu>
                
                    );
                }
                   
                }
             else{
                 return(<div style={{textAlign:'center',color:'white'}}>...</div>);
             }
            
        }
    }
	
}



/*Logged.propTypes={
    data:PropTypes.shape({
        loading:PropTypes.bool,
       user:PropTypes.array
    }).isRequired,
    
     //date:PropTypes.instanceOf(date),  
};*/


const currentUser=gql`
    query currentUser($username:String){
        user(username:$username){
            username
            uncrypted
            nom
            prenoms
            fullname
            codeRedac
            role
            
        },
        
    }`;



export default graphql(currentUser,{
    options:() => ({ variables: {username:Meteor.userId()?Meteor.user().username:null},forceFetch:true,pollInterval:4000 }),
})(Logged);

