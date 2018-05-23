import React,{PropTypes,Component} from 'react';
import AppBar from 'material-ui/AppBar';
import LoginForm from '../components/LoginForm.jsx';

export default class LoginUserCont extends Component{
    constructor(){
        super();
    }
    
    render(){
        return(
           <div className="centeredContent">
                <div className="loginDiv zoomIn animated">
                    <AppBar
                        title="Identification de l'émetteur"
                        style={{backgroundColor: '#212f68'}}
                        iconClassNameLeft="none"
                        titleStyle={{
                            textAlign:'center'
                        }}
                    />
                    <LoginForm/>
                </div>
           </div>
        )
    }
}