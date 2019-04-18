import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import history from '../../history';
import {fetchTvShows} from '../../actions';
import RequireLogin from '../RequireLogin';


class TvShowList extends React.Component{

    componentDidMount(){
        this.props.fetchTvShows();
    }

    renderTvShows(){
        const imgURL = 'https://image.tmdb.org/t/p/w500';
        return this.props.tvShows.sort((a,b) => b.vote_average - a.vote_average)
        .map(({id, poster_path, name, overview, vote_average}) => {
            return (
                <div className="col s12 m3" key={id}>
                    <div className="card big">
                        <div 
                        className="card-image" 
                        style={{cursor:'pointer'}} 
                        onClick={() =>history.push(`/tvshow/${id}`)}
                        >
                            <img height="300px" src={`${imgURL}/${poster_path}`} alt="..." />
                            <span className="card-title">{name}</span>
                            <p 
                            class="btn-floating halfway-fab waves-effect waves-light red" 
                            style={{textAlign:'center'}}
                            >
                            {vote_average}
                            </p>
                        </div>
                        <div className="card-content" style={{height:'100px'}}>
                            <p>{`${overview.substring(0,70)}...`}</p>
                        </div>
                        <div className="card-action" >
                            <Link to={`/edit/tvshow/${id}`} style={{color:'blue'}}>Edit</Link>
                            <Link to={`/delete/tvshow/${id}`} style={{color:'blue'}} className="right">Remove</Link>

                        </div>
                    </div>
                </div>
            );
        });
    }

    render(){
        if(this.props.isSignedIn === false){
            return <RequireLogin />;
        }
        if(!this.props.tvShows){
            return null;
        }
        return(
            <div className="row" style={{marginTop:'20px'}}>
                {this.renderTvShows()}
            </div>
        );
    }
}

const mapStateToProps = ({tvShows, auth}) => {
    return {
        tvShows: Object.values(tvShows),
        isSignedIn: auth.isSignedIn
    };
}

export default connect(mapStateToProps, {fetchTvShows})(TvShowList);