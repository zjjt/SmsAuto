import React,{Component} from 'react';
import {FlowRouter} from 'meteor/ostrio:flow-router-extra';
import {Toolbar,ToolbarSeparator,ToolbarTitle,ToolbarGroup} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {connect} from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import {TextField} from 'redux-form-material-ui';
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import Divider from 'material-ui/Divider';
import {switchtab1,switchtab2} from '../../redux/actions/user-actions'; 
//import ModVendor from '../components/ModVendor';
import {Tabs, Tab} from 'material-ui/Tabs';
import LoginUserCont from './LoginUserCont';
import SwipeableViews from 'react-swipeable-views';

 class InvisibleParaTabSwitcher extends Component {
    constructor(props){
        super();
        this.state={
            slideIndex: 0,
            slideTitle:[],
            shouldChange:false
        };

    }
    handleSlideChange = (value) => {
        this.setState({
          slideIndex: value,
          shouldChange:false
        });
      };

    componentDidMount(){
        $('.toolbarTitle').delay(18000).show().addClass("fadeInRight animated");
        if(this.props.tabs!="undefined"){
            this.props.tabs.map((e,i)=>{
                this.setState({
                    slideTitle:this.state.slideTitle.push(e.title)
                })
            })
        }
        //si quand on monte le component il est a la vue deux on affiche la premiere vue
        if(this.state.slideIndex>0){
            this.props.dispatch(switchtab1());//toggle on
            this.setState({
                slideIndex: 0,
                shouldChange:false
            });
            console.log(changeTabTo+"   "+whichTab)
        }
       
    }

    componentDidUpdate(){
        const {changeTabTo,whichTab}=this.props;
        if(changeTabTo && whichTab==1){
            console.log(changeTabTo+"   "+whichTab)
            this.handleSlideChange(whichTab);
            this.props.dispatch(switchtab2());
        }else if(changeTabTo && whichTab==1){
            console.log(changeTabTo+"   "+whichTab)
            this.handleSlideChange(whichTab);
            this.props.dispatch(switchtab1());
        }
        
        /*if(this.state.shouldChange){
            this.handleSlideChange(whichTab);
            this.props.dispatch(switchtab1());//toggle off
        }*/
    }
    render(){
        console.dir(this.state);
        return(
            <div className="centeredContentSingleColumnInvisible">
                <Tabs
                    onChange={this.handleSlideChange}
                    value={this.state.slideIndex}
                    tabTemplateStyle={style.tabTemplate}
                    inkBarStyle={style.inkBarStyle}
                >
                {
                    typeof this.props.tabs !="undefined" && this.props.tabs.length?this.props.tabs.map((e,i)=>{
                        return (<Tab label="" value={i} key={i} />)
                    }):null
                }
            
                </Tabs>
                <div className="contentWrapper ">
                <Toolbar style={style.toolbar}>
                        <ToolbarGroup>
                            <ToolbarTitle text={this.state.slideTitle[this.state.slideIndex]} className="toolbarTitle"/>
                        </ToolbarGroup>
                </Toolbar>
                    <center><Divider/></center>
                    <SwipeableViews
                        index={this.state.slideIndex}
                        onChangeIndex={this.handleSlideChange}
                        className="swipeable fadeInUp animated"
                    >
                        {
                    typeof this.props.tabs !="undefined" && this.props.tabs.length?this.props.tabs.map((e,i)=>{
                        return (<div key={i}>{e.component}</div>)
                    }):null
                }
                    </SwipeableViews>
                </div>
               
            </div>
        );
    }
}

export default connect((state,dispatch)=>{
    return {
        whichTab:state.user.switchedOnTab1?0:state.user.switchedOnTab2?1:null,
        changeTabTo:state.user.switchedOnTab1?state.user.switchedOnTab1:state.user.switchedOnTab2?state.user.switchedOnTab2:false
    }
})(InvisibleParaTabSwitcher)

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
