import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createPerson } from '../actions/';
import '../App.css';

const required = value => value ? undefined : 'Anna nimi';
const maxLength = max => value =>
  value && value.length > max ? `Nimi enintään ${max} kirjainta.` : undefined
const maxLength10 = maxLength(10)
const abc = value =>
  value && !/[A-Za-zäöÄÖ]$/i.test(value) ?
  'Vain kirjaimia' : undefined

class AddPerson extends React.Component {


    renderInput({ input, label, type, meta: { touched, error, warning } }){
        
        return (
            <div className="field">
                <label className="addnamefield">{label}</label><br></br>
                <input className="addnamefield" type="text" max="8" size="10" {...input} autoComplete="off" min="0" />
                <br></br>
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        );

/*     renderInput(formProps){
        return <input {...formProps.input} />
 */
/*                     onChange={formProps.input.onChange}
                    value={formProps.input.value}
                />; */
    }

    onSubmit = (formValues) => {
        this.props.createPerson(formValues);
        this.props.reset();

    }

    render() {
        return (
            <form type="text"  onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <div>
                    <div className="adduserblock">
                        <Field  name='Name' 
                        component={this.renderInput} 
                        label="Lisää käyttäjä"
                        validate={[ required, maxLength10, abc ]}
                        />
                    </div>
                    <div className="adduserplus">
                        <button >+</button>
                    </div>
                </div>
            </form>
        );
    }
}

const formWrapped = reduxForm({
    form: 'personCreate'
})(AddPerson);

export default connect(null, { createPerson })(formWrapped);