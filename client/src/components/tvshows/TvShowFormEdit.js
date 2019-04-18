import React from 'react';
import {reduxForm, Field} from 'redux-form';
import {Link} from 'react-router-dom';

const FIELDS = [
    {name:'name', label:'Name', errorMessage: 'Name is required'},
    {name:'overview', label:'Description', errorMessage :'Description is required'},
    {name:'vote_average', label:'IMDB', errorMessage: 'IMDB is required'}
]; 
class TvShowFormEdit extends React.Component{

    inputField({input, label, meta :{error, touched}}){
        return(
            <div>
                <label>{label}</label>
                <input type="text" {...input} autoComplete="off" />
                <div style={{color:'red'}}>
                    {touched && error}
                </div>
            </div>
        );
    }

    renderContent(){
        return FIELDS.map(({name, label}) => {
            return <Field key = {name} name = {name} component={this.inputField} label={label} type="text" />
        });
    }

    onSubmit = (formValues) =>{
        this.props.onSubmitForm(formValues);
    }

    render(){
        return(
        <form onSubmit = {this.props.handleSubmit(this.onSubmit)}>
            {this.renderContent()}
            <button className="btn green btn-submit" style={{marginTop:'30px'}}>Save</button>
            <Link to="/tvshows" className="btn" style={{marginTop:'30px', marginLeft:'5px'}}>Cancel</Link>
        </form>
        );
    }
}

const validate = formValues =>{
    const error = {};
    if(formValues.vote_average >10){
        error.vote_average = 'Must be under 10!';
    }
    FIELDS.forEach(({name, errorMessage}) =>{
        if(!formValues[name]){
            error[name] = errorMessage;
        }
    });
    return error;
}

export default reduxForm({
    form:'tvShowForm',
    enableReinitialize: true,
    validate
})(TvShowFormEdit);