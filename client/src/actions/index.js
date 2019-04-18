import axios from 'axios';
import history from '../history';
import {
    FETCH_TVSHOWS,
    FETCH_TVSHOW,
    DELETE_TVSHOW,
    EDIT_TVSHOW,
    FETCH_USER
} from './types';

export const fetchTvShows = () => async dispatch =>{
    const response = await axios.get('/api/tvshows');
    dispatch({type: FETCH_TVSHOWS, payload: response.data});
}

export const fetchTvShow = id => async dispatch =>{
    const response = await axios.get(`/api/tvshow/${id}`);
    dispatch({type: FETCH_TVSHOW, payload: response.data});
}

export const deleteTvShow = id => async dispatch => {
    await axios.delete(`/api/tvshow/${id}`);
    dispatch({type:DELETE_TVSHOW, payload: id });
    history.push('/tvshows');
} 

export const editTvShow = (id, tvShow) => async dispatch =>{
    const response = await axios.patch(`/api/tvshow/${id}`, tvShow);
    dispatch({type: EDIT_TVSHOW, payload: response.data});
    history.push('/tvshows');
}

export const fetchUser = () => async dispatch => {
    const response = await axios.get('/auth/current_user');
    dispatch({type:FETCH_USER, payload: response.data});
}
