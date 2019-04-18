import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {fetchTvShow} from '../../actions'; 
import RequireLogin from '../RequireLogin';

class TvShowDetail extends React.Component{
    
    componentDidMount(){
        this.props.fetchTvShow(this.props.match.params.id);
    }

    renderContent(){
        const {poster_path, backdrop_path, vote_average, overview, title, name} = this.props.tvShow;       
        const imgURL = `https://image.tmdb.org/t/p/w500${poster_path ? poster_path : backdrop_path}`
        return(
            <div className="card horizontal small " style={{marginTop:'30px', marginBottom:'30px'}}>
                <img src={imgURL} className="card-image" alt="..." />
                <div className="card-stacked">
                    <h5 className="card-header" style={{textAlign:'center'}}>
                    {title ? title : name}
                    </h5>
                    <p className="card-content">
                    {overview}
                    </p>
                    <div className="card-action">
                        <p><b>IMDB: {vote_average}</b></p>
                    </div>
                </div>
            </div>
        );        
    }

    renderButton(){
        return(
            <React.Fragment>
                <Link 
                to="/tvshows" 
                type="button" 
                className="waves-effect waves-light btn" 
                style={{marginTop:'20px'}}
                >
                    <i className="material-icons left">keyboard_arrow_left</i>
                    Back
                </Link>
                <Link 
                to={`/edit/tvshow/${this.props.tvShow.id}`} 
                type="button" 
                className="waves-effect waves-light btn" 
                style={{marginTop:'20px', marginLeft:'10px'}}
                >
                    <i className="material-icons left">edit</i>
                    Edit
                </Link>
            </React.Fragment>
        );
    }

    render(){
        if(this.props.isSignedIn === false){
            return <RequireLogin />;
        }
        if(!this.props.tvShow){
            return null;
        }
        return (
            <div>
                {this.renderButton()}
                {this.renderContent()}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        tvShow: state.tvShows[ownProps.match.params.id],
        isSignedIn: state.auth.isSignedIn
    };
}

export default connect(mapStateToProps, {fetchTvShow})(TvShowDetail);