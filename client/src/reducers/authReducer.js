import {
    FETCH_USER
} from '../actions/types';

const INITIAL_VALUE ={
    isSignedIn:null
};

export default (state=INITIAL_VALUE, action) =>{
    switch(action.type){
        case FETCH_USER:
            return {...state, isSignedIn: action.payload};
        default:
            return state;
    }
}