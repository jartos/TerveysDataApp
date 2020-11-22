import React from 'react';
import { connect } from 'react-redux';
import { createWeight, fetchMeasures } from '../actions';


import '../App.css';


class WeightFormInitial extends React.Component {

  state = {
    MeasureValue: 50,
    MeasureName: this.props.name,
    Date: "2020-1-1",   //new Date(),
    /* PersonID: this.props.selectedperson.PersonID, */
    TypeID: 5
  };

  change = e => {
    this.props.onChange({ [e.target.name]: parseInt(e.target.value) });
    this.setState({
      [e.target.name]: parseInt(e.target.value)
    });
  };

  onSubmit = async e => {
      console.log("this.state.MeasureValue",this.state.MeasureValue);
    if(this.state.MeasureValue !== ''){
        e.preventDefault();
        console.log("state: ", this.state)
        await this.props.createWeight(this.props.selectedperson.PersonID, this.state);
        this.props.fetchMeasures(this.props.selectedperson.PersonID);
    }
  };

  render() {
    return (
      <form>
        <input
          type="range"
          name="MeasureValue"
          value={this.state.MeasureValueWeight}
          onChange={e => this.change(e)}
        />
        <button onClick={e => this.onSubmit(e)}>+</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
    return { 
      selectedperson: (state.selectedperson),
      weight: (state.weight),
      terveysdata: (state.terveysdata)
     }
      
  };
  
  export default connect(mapStateToProps, { createWeight, fetchMeasures })(WeightFormInitial);