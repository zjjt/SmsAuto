import React,{PropTypes,Component} from 'react';
import AppBar from 'material-ui/AppBar';
import AdminForm from '../components/AdminForm.jsx';

export default class LoginUserCont extends Component{
    constructor(){
        super();
    }
    
    render(){
        return(
           <div className="centeredContent">
                <div className="loginDiv zoomIn animated">
                    <AppBar
                        title="Identification de l'administrateur"
                        style={{backgroundColor: '#212f68'}}
                        iconClassNameLeft="none"
                        titleStyle={{
                            textAlign:'center'
                        }}
                    />
                    <AdminForm/>
                </div>
           </div>
        )
    }
}