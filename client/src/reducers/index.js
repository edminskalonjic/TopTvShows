import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import tvShowReducer from './tvShowReducer';
import authReducer from './authReducer';


export default combineReducers({
    tvShows:tvShowReducer,
    form: formReducer,
    auth:authReducer
});