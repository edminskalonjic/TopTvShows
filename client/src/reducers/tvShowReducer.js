import _ from 'lodash';
import {
    FETCH_TVSHOWS, 
    FETCH_TVSHOW,
    DELETE_TVSHOW,
    EDIT_TVSHOW
} from '../actions/types';

export default (state = {}, action) => {
    switch(action.type){
        case FETCH_TVSHOWS:
            return {...state, ..._.mapKeys(action.payload, 'id')};
        case FETCH_TVSHOW:
            return {...state, [action.payload.id]:action.payload};
        case EDIT_TVSHOW:
            return {...state, [action.payload.id]: action.payload};
        case DELETE_TVSHOW:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}