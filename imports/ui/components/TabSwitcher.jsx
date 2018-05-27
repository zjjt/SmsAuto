import React,{Component} from 'react';
import {FlowRouter} from 'meteor/ostrio:flow-router-extra';
import {Toolbar,ToolbarSeparator,ToolbarTitle,ToolbarGroup} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {TextField} from 'redux-form-material-ui';
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import Divider from 'material-ui/Divider';
//import ModVendor from '../components/ModVendor';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import InvisibleParaTabSwitcher from './InvisibleParaTabSwitcher';
import EnvoiSpontForm from './EnvoiSpontForm';
import LoginUserCont from './LoginUserCont';
import AdminUserCont from './AdminUserCont';

import {resetState} from '../../redux/actions/user-actions';
import {deconnection} from '../../redux/actions/admin-actions';
import SwipeableViews from 'react-swipeable-views';

export default class TabSwitcher extends Component {
    constructor(){
        super();
        this.state={
            slideIndex: 0,
            slideTitle:[' Renseignez les informations demandées','Veuillez régler les envois',"Tous les rapports"]
        };

    }
    handleSlideChange = (value) => {
        this.setState({
          slideIndex: value,
        });
      };
    componentDidMount(){
        $('.toolbarTitle').delay(18000).show().addClass("fadeInRight animated");
    }
    render(){
        const {dispatch}=this.props;
        return(
            <div className="centeredContentSingleColumn">
                <Tabs
                    onChange={this.handleSlideChange}
                    value={this.state.slideIndex}
                    tabTemplateStyle={style.tabTemplate}
                    inkBarStyle={style.inkBarStyle}
                >
                    <Tab  label="Envois Spontanés" value={0} buttonStyle={style.tabTemplate}/>
                    <Tab  label="Envois automatiques" value={1} buttonStyle={style.tabTemplate} />
                    <Tab  label="Rapports d'envois" value={2} buttonStyle={style.tabTemplate} />
                </Tabs>
                <div className="contentWrapper fadeInUp animated">
                <Toolbar style={style.toolbar}>
                        <ToolbarGroup>
                           <ActionExitToApp style={style.homeicon} 
                            color="#212f68" 
                            hoverColor="#cd9a2e" 
                            title="Déconnectez vous"
                            className="icono"
                            disabled={this.props.isConnected ||this.props.isAdminConnected ? false : true}
                            onClick={()=>{
                                if(this.props.isConnected){
                                    Meteor.logout((err,res)=>{
                                        dispatch(resetState());
                                        alert("Vous êtes déconnecté");
                                    })
                                }else if (this.props.isAdminConnected){
                                    dispatch(deconnection());
                                    alert("Vous êtes déconnecté");
                                }
                                
                            }}
                            />
                        </ToolbarGroup>
                        <ToolbarGroup>
                            <ToolbarTitle text={this.state.slideTitle[this.state.slideIndex]} className="toolbarTitle"/>
                        </ToolbarGroup>
                </Toolbar>
                    <center><Divider/></center>
                    <SwipeableViews
                        index={this.state.slideIndex}
                        onChangeIndex={this.handleSlideChange}
                    >
                        <div>
                            <InvisibleParaTabSwitcher who={"envSPT"}
                                tabs={[{
                                    title:"connexion",
                                    component:<LoginUserCont/>
                                },{
                                    title:"envoiSpontane",
                                    component:<EnvoiSpontForm/>
                                }]}
                            />
                        </div>
                        <div>
                            <InvisibleParaTabSwitcher who={"envAUT"}
                                tabs={[{
                                    title:"connexion",
                                    component:<AdminUserCont/>
                                },{
                                    title:"mesconfig",
                                    component:<EnvoiSpontForm/>
                                },{
                                    title:"creationConfig",
                                    component:<EnvoiSpontForm/>
                                },{
                                    title:"modifConfig",
                                    component:<EnvoiSpontForm/>
                                }]}
                            />
                        </div>
                        <div>
                            <p>rapport de tous les envois</p>
                        </div>
                    </SwipeableViews>
                </div>
               
            </div>
        );
    }
}



const style={
    homeicon:{
        width: 40,
        height: 40
    },
    toolbar:{
        backgroundColor:'white',
    },
    tabTemplate:{
        backgroundColor:'#202e67'
    },
    inkBarStyle:{
        backgroundColor:'#cd9a2e'
    }
};
