import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import RequireLogin from './RequireLogin';

const SaveJSONConfirm = ({isSignedIn})=>{
    
    if(isSignedIn === null){
        return null;
    }else if(isSignedIn=== false){
        return <RequireLogin />
    }
    return(
        <div>
            <br/>
            <h5>Save JSON file tvshows.json with modified tv shows on path: <b>C:\JSON\tvshows.json</b></h5>
            <a href="/savejsonfile"
                className="btn green"
                style={{marginTop:'20px'}}
                >
                    Save
            </a>
                <Link to ="/tvshows" className="btn " style={{marginTop:'20px', marginLeft:'5px'}}>Cancel</Link>
        </div>
    );
}

const mapStateToProps = ({auth}) =>{
    return {isSignedIn: auth.isSignedIn};
}

export default connect(mapStateToProps)(SaveJSONConfirm);