import * as actions from '../actions/user-actions';

const initialState={
    mettreAjour:false,
    mettreAjourBank:false,
    isUserConnected:false,
    envSPT:{
        switchedOnTab1:false,
        switchedOnTab2:false,
    },
    envAUT:{
        switchedOnTab1:false,
        switchedOnTab2:false,
        switchedOnTab3:false,
        switchedOnTab4:false
    },

    
    user:null
};

export default function userReducer(state=initialState,action){
   // console.dir(action);
    switch(action.type){
        case actions.USERCONNECTED:
       // alert(action.user);
        return{
            ...state,
            isUserConnected:true,
            //user:action.user
        };
        case actions.RESETTABS:
            return{
                ...state,
                envSPT:{
                    ...state.envSPT,
                    switchedOnTab1:false,
                    switchedOnTab2:false,
                },
                envAUT:{
                    ...state.envAUT,
                    switchedOnTab1:false,
                    switchedOnTab2:false,
                    switchedOnTab3:false,
                    switchedOnTab4:false
                }
            }
        case actions.SWITCHTAB1:
            if(action.who=="envSPT"){
                return{
                    ...state,
                    envSPT:{
                        ...state.envSPT,
                        switchedOnTab1:!state.envSPT.switchedOnTab1,
                        switchedOnTab2:false,
                    }
                };
            }else if(action.who=="envAUT"){
                return{
                    ...state,
                    envAUT:{
                        ...state.envAUT,
                        switchedOnTab1:!state.envAUT.switchedOnTab1,
                        switchedOnTab2:false,
                        switchedOnTab3:false,
                        switchedOnTab4:false
                    }
                };
            }
            
        
        case actions.SWITCHTAB2:
            if(action.who=="envSPT"){
                return{
                    ...state,
                    envSPT:{
                        ...state.envSPT,
                        switchedOnTab1:false,
                        switchedOnTab2:!state.envSPT.switchedOnTab2,
                    }
                };
            }else if(action.who=="envAUT"){
                return{
                    ...state,
                    envAUT:{
                        ...state.envAUT,
                        switchedOnTab1:false,
                        switchedOnTab2:!state.envAUT.switchedOnTab2,
                        switchedOnTab3:false,
                        switchedOnTab4:false
                    }
                };
            }
            case actions.SWITCHTAB3:
            if(action.who=="envSPT"){
                return{
                    ...state,
                    envSPT:{
                        ...state.envSPT,
                        switchedOnTab1:false,
                        switchedOnTab2:!state.envSPT.switchedOnTab2,
                    }
                };
            }else if(action.who=="envAUT"){
                return{
                    ...state,
                    envAUT:{
                        ...state.envAUT,
                        switchedOnTab1:false,
                        switchedOnTab2:false,
                        switchedOnTab3:!state.envAUT.switchedOnTab3,
                        switchedOnTab4:false
                    }
                };
            }
            case actions.SWITCHTAB4:
            if(action.who=="envSPT"){
                return{
                    ...state,
                    envSPT:{
                        ...state.envSPT,
                        switchedOnTab1:false,
                        switchedOnTab2:!state.envSPT.switchedOnTab2,
                    }
                };
            }else if(action.who=="envAUT"){
                return{
                    ...state,
                    envAUT:{
                        ...state.envAUT,
                        switchedOnTab1:false,
                        switchedOnTab2:false,
                        switchedOnTab3:false,
                        switchedOnTab4:!state.envAUT.switchedOnTab4
                    }
                };
            }
        
        case actions.RESET:
        return{
            ...state,
            mettreAjour:false,
            mettreAjourBank:false,
            isUserConnected:false,
            user:null
        }
        default:
            return state;

    }

}