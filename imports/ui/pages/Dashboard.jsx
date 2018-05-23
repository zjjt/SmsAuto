import React,{PropTypes,Component} from 'react';
import AppBar from 'material-ui/AppBar';
import TabSwitcher from '../components/TabSwitcher.jsx';
import {connect} from 'react-redux';
import {createContainer} from "meteor/react-meteor-data";

 class Dashboard extends Component{
    constructor(){
        super();
    }
    
    render(){
        return(
           <div className="centeredContent">
                <div className="loginDiv fadeInUp animated">
                    <AppBar
                        title="Gestion des envois automatiques de sms"
                        style={{backgroundColor: '#212f68'}}
                        iconClassNameLeft="none"
                        titleStyle={{
                            textAlign:'center'
                        }}
                    />
                    <TabSwitcher isConnected={this.props.authenticated} isAdminConnected={this.props.adminConnected} dispatch={this.props.dispatch}/>
                </div>
           </div>
        )
    }
}

Dashboard= connect((state,dispatch)=>({
    dispatch,
    adminConnected:state.administrateurAction.adminConnected
}))(Dashboard);

export default createContainer(()=>{
    return {
      authenticated: Meteor.userId(),
    }
  },Dashboard);