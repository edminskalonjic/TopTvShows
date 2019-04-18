import React from 'react';
import {connect} from 'react-redux';

class Landing extends React.Component{
    renderContent(){
        return(
            <div>
                <div>
                    <b>Let's talk about TMDb</b><br/>
                    The Movie Database (TMDb) is a community built movie and TV database.
                    Every piece of data has been added by our amazing community dating back to 2008. 
                    TMDb's strong international focus and breadth of data is largely unmatched and something
                    we're incredibly proud of.
                    Put simply, we live and breathe community and that's precisely what makes us different.
                </div>
                <br />
                <div>
                <b>API overview</b><br/>
                    Our API is available for everyone to use. 
                    A TMDb user account is required to request an API key. 
                    Professional users are approved on a per application basis.
                    To view all the methods available, you should head over to <b>developers.themoviedb.org</b>. 
                    Everything outlined on this page is simply a high level overview to help you understand 
                    what is available.
                </div>
            </div>
        );
    }
    render(){
        if(this.props.isSignedIn === null){
            return null;
        }else if(this.props.isSignedIn === false){
            return(          
                <div >
                    <h5>Welcome! Please Login using your Google Account in order to watch and modify the details of the 20 best TV shows!</h5>
                    <br/>
                    {this.renderContent()}
                </div>            
            );
        }
        return(          
            <div >
                <h5>Welcome user, you can watch and modify the details of the 20 best TV shows(fetched from themoviedb.org API) and write JSON to the file on disk!</h5>
                <br/>
                {this.renderContent()}
            </div>            
        );
    }
}

const mapStateToProps = ({auth}) =>{
    return {isSignedIn: auth.isSignedIn};
}

export default connect(mapStateToProps)(Landing);