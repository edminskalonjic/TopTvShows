import React from 'react';
import {Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import history from '../history';
import {fetchUser} from '../actions';
import Header from './Header';
import TvShowList from './tvshows/TvShowList';
import TvShowDelete from './tvshows/TvShowDelete';
import TvShowEdit from './tvshows/TvShowEdit';
import TvShowDetail from './tvshows/TvShowDetail';
import Landing from './Landing';
import SaveJSONConfirm from './SaveJSONConfirm';

class App extends React.Component {
    componentDidMount(){
        this.props.fetchUser();
    }
    render(){
        return (
            <div className="container">
                <Router history={history}>
                    <div>
                        <Header />
                        <Route path="/" exact component={Landing}/>
                        <Route path="/landing" exact component={Landing}/>
                        <Route path="/tvshows" exact component={TvShowList} />
                        <Route path="/delete/tvshow/:id" exact component={TvShowDelete}/>
                        <Route path="/edit/tvshow/:id" exact component={TvShowEdit}/>
                        <Route path="/tvshow/:id" exact component={TvShowDetail}/>
                        <Route path="/savejsonconfirm" exact component = {SaveJSONConfirm} />
                    </div>
                </Router>
            </div>
        );
    }
}

export default connect(null, {fetchUser})(App);