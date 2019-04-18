import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class Header extends React.Component{

    renderContent(){
        switch(this.props.isSignedIn){
            case null:
                return null;
            case false: 
                return(
                    <React.Fragment>
                        <ul className="right">
                            <li><a href="/auth/google">Login with Google</a></li>
                        </ul>
                    </React.Fragment>
                );
            default:
            return(
                <React.Fragment>
                    <ul className="right">
                        <li><Link to="/tvshows">Tv Shows</Link></li>
                        <li><Link to="/savejsonconfirm">Save JSON</Link></li>
                        <li><a href="/auth/logout">Logout</a></li>
                    </ul>
                </React.Fragment>
            );  
        }
    }

    render(){
        return(
            <nav>
                <div className="nav-wrapper teal lighten-2">
                <Link 
                to={this.props.isSignedIn ? '/tvshows' : '/landing'} 
                className="left brand-logo"
                >
                Top 20 Shows
                </Link>
                    {this.renderContent()}
                </div>
            </nav>
        );
    }
}

const mapStateToProps = ({auth}) =>{
    return {isSignedIn:auth.isSignedIn};
}

export default connect(mapStateToProps)(Header);