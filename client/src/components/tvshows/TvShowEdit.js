import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import {fetchTvShow, editTvShow} from '../../actions';
import TvShowFormEdit from './TvShowFormEdit';
import RequireLogin from '../RequireLogin';


class TvShowEdit extends React.Component{
 
    componentDidMount(){
        this.props.fetchTvShow(this.props.match.params.id);
    }

    onSubmitForm = (formValues) => {
        this.props.editTvShow(this.props.match.params.id, formValues);
    }

    render(){
        if(this.props.isSignedIn === false){
            return <RequireLogin />;
        }else if(this.props.isSignedIn === null){
            return null;
        }
        return(
            <div>
                <h3>Edit this Tv Show</h3>
                <TvShowFormEdit 
                onSubmitForm={this.onSubmitForm} 
                initialValues = {_.pick(this.props.tvShow, 'name', 'overview', 'vote_average')}
                />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) =>{
    return {
        tvShow: state.tvShows[ownProps.match.params.id],
        isSignedIn: state.auth.isSignedIn
    };
}

export default connect(mapStateToProps, {fetchTvShow, editTvShow})(TvShowEdit);