import React from 'react';
import { connect } from 'react-redux';
import { fetchMeasures } from '../actions';

import '../App.css';

class Weight extends React.Component {
  render() {
    return this.props.terveysdata.map(tdata => {
      return tdata.slice(0, 1).map(data => {
        var d = new Date();
        var d = new Date(data.Date);
        if (data.TypeID === 1){
          return (
            <div key={data.MeasureID}>
              <ul>
                <li>
                  <p className="measuredateblack">{d.toDateString()}</p>   
                </li>
                <br></br>
                <li>
                  <p >{data.MeasureValue} kg</p> 
                </li>
              </ul>    
            </div>                                   
          );
        }
        else return <div className="measurename" key={data.MeasureID}></div>;
       });
    });
}       
}

const mapStateToProps = (state) => {
  return { 
    terveysdata: Object.values(state.terveysdata), // Objektin arvot taulukkoon
   }
    
};

export default connect(mapStateToProps, { fetchMeasures })(Weight);