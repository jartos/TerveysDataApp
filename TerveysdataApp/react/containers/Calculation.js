import { connect } from 'react-redux';
import Chart from '../components/Chart';

  const getData = ({ terveysdata }) => {
    let weightdata = [];
    if (terveysdata[6] !== undefined){
        weightdata = terveysdata[6].map(a => a.MeasureValue)
    };

    let waistdata = [];
    if (terveysdata[5] !== undefined){
        waistdata = terveysdata[5].map(a => a.MeasureValue)
    };

    let heartbeatdata = [];
    
/*  console.log("terveysdata",terveysdata);
    console.log("heartbeat",heartbeat.MeasureValue); */

    if (terveysdata[4] !== undefined){
        heartbeatdata = terveysdata[4].map(a => a.MeasureValue)
        console.log("heartbeatdata: ", heartbeatdata);
    };

    return {
       
        labels: ["Tammi", "Helmi", "Maalis", "Huhti", "Touko", "Kesä",
                "Heinä", "Elo", "Syys", "Loka", "Marras", "Joulu"],
        datasets: [
             {
                type: 'line',
                label: 'Syke',
                fill: false,
                data: heartbeatdata,
                /* data: heartbeats, */
                backgroundColor: heartbeatdata.map(() => {
                    return 'rgba(255, 69, 0, 0.6)'
                }),
                borderColor: heartbeatdata.map(() => {
                    return 'rgba(255, 69, 132, 1)'
                }),
                borderColor: "#ff79dc",
                backgroundColor: '#ff79dc',
                borderWidth: 4
            },
            {
            label: 'Paino',
            fill: false,
            data: waistdata,
            /* data: weight, */
            borderColor: 'rgba(54, 54, 54, 0.6)',
            backgroundColor: '#003249'
            },
           {
            label: 'Vyötärö',
            data: weightdata,
            /* data: waist, */
            backgroundColor: weightdata.map(() => {
                return 'rgba(154, 205, 50, 0.8)'
            }),
            borderColor: weightdata.map(() => {
                return 'rgba(154, 205, 50, 1)'
            }),
            borderWidth: 1,          
            backgroundColor: '#80CED7'
        }],
    }
};

const mapStateToProps = (state, ownProps) => ({
  data: getData(state),
  type: "bar",
  width: "40%",
  terveysdata: Object.values(state.terveysdata).keys,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    
});

const Calculation = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Chart);
  
  export default Calculation;
