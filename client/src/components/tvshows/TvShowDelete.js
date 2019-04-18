import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {deleteTvShow, fetchTvShow} from '../../actions';
import RequireLogin from '../RequireLogin';


class TvShowDelete extends React.Component{

    componentDidMount(){
        this.props.fetchTvShow(this.props.match.params.id);
    }

    renderButton(){
        return(
            <div>
                <button 
                onClick={() => this.props.deleteTvShow(this.props.match.params.id)}
                className="btn red"
                style={{marginTop:'20px'}}
                >
                    Delete
                </button>
                <Link to ="/tvshows" className="btn" style={{marginTop:'20px', marginLeft:'5px'}}>Cancel</Link>
            </div>
        );
    }

    render(){
        if(this.props.isSignedIn === false){
            return <RequireLogin />;
        }
        if(!this.props.tvShow){
            return null;
        }
        const {name, overview} = this.props.tvShow;
        return(
            <div>
                <h5>Are you sure you want to delete this tv show?</h5>
                <br/>
                <p><b>Title:</b> {name}</p>
                <p><b>Description:</b> {overview}</p>
                {this.renderButton()}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) =>{
    return {
        tvShow: state.tvShows[ownProps.match.params.id],
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStateToProps, {deleteTvShow, fetchTvShow})(TvShowDelete);