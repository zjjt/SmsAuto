import React,{PropTypes,Component} from 'react';
import AppBar from 'material-ui/AppBar';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import areIntlLocalesSupported from 'intl-locales-supported';
import {switchtab1,switchtab2,switchtab3,switchtab4,resetTabs} from '../../redux/actions/user-actions'; 
import RaisedButton from 'material-ui/RaisedButton';

let DateTimeFormat;
if(areIntlLocalesSupported(['fr'])){
    DateTimeFormat=global.Intl.DateTimeFormat;
}
export default class ConfigList extends Component{
    constructor(){
        super();
        this.state={
                
            dialogTIsOpen:false,
            dialogIsOpen:false,
            errorMsg:'',
            selectedRows:[],
            configSelected:[],
            table:{
                    fixedHeader:true,
                    fixedFooter:true,
                    stripedRows:false,
                    showRowHover:false,
                    selectable:true,
                    multiSelectable: false,
                    enableSelectAll:false,
                    deselectOnClickaway:false,
                    showCheckboxes:true,
                    height:'450px'
                }
        };
    }
    
    _onRowSelection(rowsarr){
        let confarray=[];
        if(rowsarr){
            rowsarr.map((r)=>{
            regarray.push(this.props.listeDispo[r]);
            //console.dir(this.props.data.userSQL[r])
         });
        }
        
        this.setState({
            selectedRows:rowsarr,
            configSelected:confarray,
            dialogTIsOpen:true
        });
        
    }

    render(){
        return(
           <div className="threesideContent">
                <div className="contentArea">
                    <h2>Liste des configurations automatiques</h2>
                </div>
                <div className="lowerAreaBtn">
                    <div>
                        <RaisedButton 
                            label="Modifier la configuration" 
                            labelColor="#ffffff"
                            backgroundColor="#cd9a2e"
                        />
                    </div>
                    <div>
                        <RaisedButton 
                            label="Nouvelle configuration" 
                            labelColor="#ffffff"
                            backgroundColor="#cd9a2e"
                            onTouchTap={()=>this.props.dispatch(switchtab3("envAUT"))}
                        />
                    </div>
                </div>
           </div>
        )
    }
}