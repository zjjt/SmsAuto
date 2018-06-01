import React,{PropTypes,Component} from 'react';
import areIntlLocalesSupported from 'intl-locales-supported';
import RaisedButton from 'material-ui/RaisedButton';
import {switchtab1,switchtab2,switchtab3,switchtab4,resetTabs} from '../../redux/actions/user-actions'; 


let DateTimeFormat;
if(areIntlLocalesSupported(['fr'])){
    DateTimeFormat=global.Intl.DateTimeFormat;
}
export default class EnvoiSpontForm extends Component{
    constructor(){
        super();
    }
    
    render(){
        return(
            <div className="threesideContent">
            <div className="contentArea">
                <h2>Nouvelle configuration d'envoi automatique</h2>
            </div>
            <div className="lowerAreaBtn">
                <div>
                    <RaisedButton 
                        label="Retour à la liste des configurations" 
                        labelColor="#ffffff"
                        backgroundColor="#cd9a2e"
                        onTouchTap={()=>this.props.dispatch(switchtab2("envAUT"))}
                    />
                </div>
                <div>
                    <RaisedButton 
                        label="Créer la configuration" 
                        labelColor="#ffffff"
                        backgroundColor="#cd9a2e"

                    />
                </div>
            </div>
       </div>
        )
    }
}