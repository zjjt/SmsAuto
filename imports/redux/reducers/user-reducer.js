import * as actions from '../actions/user-actions';

const initialState={
    mettreAjour:false,
    mettreAjourBank:false,
    isUserConnected:false,
    switchedOnTab1:false,
    switchedOnTab2:false,
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
        case actions.SWITCHTAB1:
        return{
            ...state,
            switchedOnTab1:!state.switchedOnTab1
        }
        case actions.SWITCHTAB2:
        return{
            ...state,
            switchedOnTab2:!state.switchedOnTab2
        }
        case actions.RESET:
        return{
            ...state,
            mettreAjour:false,
            mettreAjourBank:false,
            isUserConnected:false,
            switchedOnTab1:false,
            switchedOnTab2:false,
            user:null
        }
        default:
            return state;

    }

}