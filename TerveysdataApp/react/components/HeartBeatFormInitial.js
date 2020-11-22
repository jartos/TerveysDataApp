import React from 'react';
import { connect } from 'react-redux';
import { createHeartBeat, fetchMeasures } from '../actions';


import '../App.css';


class HeartBeatFormInitial extends React.Component {

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

  onSubmit = e => {
    e.preventDefault();
    console.log("state: ", this.state)
    this.props.createHeartBeat(this.props.selectedperson.PersonID, this.state);
    
    setTimeout(() => {
      this.props.fetchMeasures(this.props.selectedperson.PersonID);
    }, 1000);
    
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
  
  export default connect(mapStateToProps, { createHeartBeat, fetchMeasures })(HeartBeatFormInitial);