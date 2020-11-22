import React from 'react';
import { connect } from 'react-redux';
import { fetchMeasures } from '../actions';

import '../App.css';

class HeartBeat extends React.Component {
  render() {
   return this.props.terveysdata.map(tdata => {
     return tdata.slice(0, 1).map(data => {
      var d = new Date(data.Date);
      if (data.TypeID === 3){
        return (
          <div key={data.MeasureID}>
            <ul>
              <li>
                <p className="measuredateblack">{d.toDateString()}</p>  
               </li>
               <br></br>
               <li>
                 <p >{data.MeasureValue} beats/min</p>   
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

export default connect(mapStateToProps, { fetchMeasures })(HeartBeat);