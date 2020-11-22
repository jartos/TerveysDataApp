import React from 'react';
import { connect } from 'react-redux';
import { createHeartBeat, fetchMeasures, deleteMeasure } from '../actions';


import '../App.css';


class HeartBeatForm extends React.Component {

  state = {
    MeasureValue: 50,
    MeasureName: this.props.name,
    Date: "2020-1-1",   //new Date(),
    /* PersonID: this.props.selectedperson.PersonID, */
    TypeID: 4
  };

  change = e => {
    this.props.onChange({ [e.target.name]: parseInt(e.target.value) });
    this.setState({
      [e.target.name]: parseInt(e.target.value)
    });
  };

  onSubmit = async e => {
    e.preventDefault();
    console.log("state: ", this.state)
    await this.props.createHeartBeat(this.props.selectedperson.PersonID, this.state);
   
    await this.props.fetchMeasures(this.props.selectedperson.PersonID);
  };

  onSubmitDelete = async e => {
    e.preventDefault();
    
    let arrayLenght = this.props.terveysdata[4].length - 1
    let measureId = this.props.terveysdata[4][arrayLenght].MeasureID

    console.log("arrayLenght", arrayLenght);
    console.log("measureId", measureId);

    await this.props.deleteMeasure(measureId);
    this.props.fetchMeasures(this.props.selectedperson.PersonID);
    
  };

  render() {
    return (
      <form>
        <input
          type="range"
          name="MeasureValue"
          value={this.state.MeasureValueHeartBeat}
          onChange={e => this.change(e)}
        />
        <button onClick={e => this.onSubmit(e)}>+</button>
        <button onClick={e => this.onSubmitDelete(e)}>-</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
    return { 
      selectedperson: (state.selectedperson),
      heartbeat: (state.heartbeat),
      terveysdata: (state.terveysdata)
     }
      
  };
  
  export default connect(mapStateToProps, { createHeartBeat, fetchMeasures, deleteMeasure })(HeartBeatForm);