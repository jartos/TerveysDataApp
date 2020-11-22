import React from 'react';
import { Link } from 'react-scroll';
import _ from 'lodash';
import { connect } from 'react-redux';

import {Spring, config} from 'react-spring/renderprops'

import Calculation from '../containers/Calculation';
import AddPerson from './AddPerson';
import Modal from './Modal';
import Card from './Card';

import HeartBeatFormInitial from './HeartBeatFormInitial';
import WeightFormInitial from './WeightFormInitial';
import WaistFormInitial from './WaistFormInitial';
import HeartBeatForm from './HeartBeatForm';
import WeightForm from './WeightForm';
import WaistForm from './WaistForm';

import WelcomePage from './WelcomePage'

import {  fetchPersons,
          fetchPerson,
          deletePerson,
          fetchMeasures,
          clearMeasures,
          clearSelectedPerson,
          createHeartBeat
 } from '../actions';

import '../App.css';


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open : false,
                  fieldsHeartBeat: {},
                  fieldsWeight: {},
                  fieldsWaist: {} };
                }

  componentDidMount() {
    setTimeout(() => {
      this.props.fetchPersons();
    }, 100);
  }

 componentDidUpdate(previousProps, pS, sS) {
    var previousPersonListLenght = previousProps.persons.length;
    var updatedPersonListLenght = parseInt(Object.keys(this.props.persons).length);
    /* console.log("previousPersonListLenght: ",previousPersonListLenght)
    console.log("updatedPersonListLenght: ",updatedPersonListLenght) */

    if (previousPersonListLenght !== updatedPersonListLenght){
      setTimeout(() => {
        this.props.fetchPersons();
      }, 100);
    }
    }
  
renderPersons() {
    return this.props.persons.map(tdata => {
      // Ehdollinen tyylimuotoilu
      let active = tdata.PersonID === this.props.selectedperson.PersonID ? 'active' : '';
      let keynumber = 10000000;

      return ( 
        <div className={`personname${active}`} key={Math.floor(Math.random() * keynumber ) + 1}>
              <p key={Math.floor(Math.random() * keynumber) + 1} onClick={() => this.fetchPersonsMeasures(tdata.PersonID)} >{tdata.Name}</p>      
        </div>
      );
    });
  }

async deletePerson(id){
    await this.props.deletePerson(id);
    this.clearMeasuresAndSelectedPersons();
    console.log("this.props: ", this.props);

}

clearMeasuresAndSelectedPersons(){
  this.props.clearMeasures();
  this.props.clearSelectedPerson();
}

async fetchPersonsMeasures(id){
  this.setState({
    fieldsHeartBeat: {},
    fieldsWeight: {},
    fieldsWaist: {}
  });
  this.props.fetchPerson(id);
  await this.props.fetchMeasures(id); 

  if(this.props.terveysdata[0] === undefined && this.props.terveysdata[1] === undefined && this.props.terveysdata[2] === undefined  ){
    this.props.clearMeasures();
  }
}

//----------------------------------------------------------------- Päivitetään valittu mitta stateen r.34

onChangeHeartBeat = updatedValue => {
  console.log("onChangeHeartBeat = updatedValue =>", updatedValue);
  this.setState({
    fieldsHeartBeat: {
      ...this.state.fieldsHeartBeat,
      ...updatedValue
    }
  });
};

onChangeWeight = updatedValue => {
  this.setState({
    fieldsWeight: {
      ...this.state.fieldsWeight,
      ...updatedValue
    }
  });
};

onChangeWaist = updatedValue => {
  this.setState({
    fieldsWaist: {
      ...this.state.fieldsWaist,
      ...updatedValue
    }
  });
};
//------------------------------------------------------------------------ Modal

deleteUserFromModal(){
  this.deletePerson(this.props.selectedperson.PersonID);
   this.setState({ open: false });
}

showDeleteUserModal() {
  let content = "Haluatko varmasti poistaa käyttäjän " + this.props.selectedperson.Name + " ja kaikki käyttäjän mittaukset?";

  if (this.state.open) {
      return (
          <Modal 
              open={this.state.open}
              onDismiss={() => this.setState({ open: false })}
              title="Poista käyttäjä"
              content={content}
              actions={<div>
                            <button className="ui button primary"
                                    onClick={() => this.deleteUserFromModal()}>
                                    Poista
                            </button>
                            <button className="ui button"
                                    onClick={() => this.setState({ open: false })}
                                    >Peruuta</button>
                      </div>}
          />
      );
  }
}

render() {

//----------------------------------------------------------------------------- ALOITUSSIVU
let activePerson = this.props.selectedperson;

     if( _.isEmpty(activePerson) ) {
      return ( 
        <Spring
          from={{ opacity: 1 }}
          to={{ opacity: 1 }}>
          {props => <div style={props} className="body">
            <header className="headersticky"><h1 className="headertext">
                        Terveysdata app
                      </h1></header>
            <div className="left-sidebar">
              <div className="personslist">
                {this.renderPersons()}
              </div>
              <AddPerson className="adduser"/>
            </div>
        <WelcomePage />
        <footer>
          <Link to="bottom" smooth={true} duration={1200}>
            <div className="linktobottom">Arkkitehtuuri
            </div>
          </Link>
          <a className="footertext" 
            href="https://github.com/jartos"
            target="_blank"
            rel="noopener noreferrer"
            >GitHub 
            </a>
          </footer>    
          </div>}
     </Spring>
      )
     }
     
//-------------------------------------------------------------- VALITULLA KÄYTTÄJÄLLÄ EI MITTAUKSIA

    else if(this.props.terveysdata[0] === undefined &&
            this.props.terveysdata[1] === undefined && 
            this.props.terveysdata[2] === undefined){
    /*   console.log("fetchMeasures funktio: ", this.props.terveysdata);  */
      return (
      <div className="body">
      <header><h1 className="headertext" 
                  onClick={() => this.clearMeasuresAndSelectedPersons()}>
                    Terveysdata app
                </h1></header>
      <div className="left-sidebar">
          <div className="personslist">
            {this.renderPersons()}
          </div>
          <AddPerson className="adduser"/>
                <div className="deleteuserblock">
                  <p className="deleteusertext">POISTA</p>
                  <div className="deleteuser"><p>{this.props.selectedperson.Name}</p></div>
                  <div className="deleteuser">
                  <button onClick={() => this.setState({ open: !this.state.open })}>-</button>                  </div>
                </div>
        </div>
      <main className="center">
        <div className="welcome">Käyttäjällä {this.props.selectedperson.Name} ei ole mittauksia</div>
        <div className="addvalues">
                Syke
                <div className="App">
                    <HeartBeatFormInitial props={this.props} onChange={fieldsHeartBeat => this.onChangeHeartBeat(fieldsHeartBeat)} />
                    <p>
                      {JSON.stringify(this.state.fieldsHeartBeat.MeasureValue, null, 2)}
                    </p>
                </div>
                <br></br>
                Paino
                <div className="App">
                  <WeightFormInitial props={this.props} onChange={fieldsWeight => this.onChangeWeight(fieldsWeight)} />  
                  <p>
                  {JSON.stringify(this.state.fieldsWeight.MeasureValue, null, 2)}
                  </p>
                </div>
                <br></br>
                Vyötärö
                        <div className="App">
                          <WaistFormInitial props={this.props} onChange={fieldsWaist => this.onChangeWaist(fieldsWaist)} />  
                          <p>
                            {JSON.stringify(this.state.fieldsWaist.MeasureValue, null, 2)}
                          </p>
                       </div>
              <br></br>
          </div>
      </main>
      <footer>
        <Link to="bottom" smooth={true} duration={1200}>
          <div className="linktobottom">Arkkitehtuuri
          </div>
        </Link>
        <a className="footertext" href="https://github.com/jartos" target="_blank" rel="noopener noreferrer">GitHub</a>
      </footer>
      {this.showDeleteUserModal()}
   </div>
    )
  }
  //------------------------------------------------------------------------ KÄYTTÄJÄN MITTAUKSET
    return <div className="body">
              <header><h1 className="headertext"
                          onClick={() => this.clearMeasuresAndSelectedPersons()}>
                          Terveysdata app
                        </h1></header>
              <div className="left-sidebar">
                <div className="personslist">
                {this.renderPersons()}
                </div>
                <AddPerson className="adduser"/>
                <div className="deleteuserblock">
                  <p className="deleteusertext">POISTA</p>
                  <div className="deleteuser"><p>{this.props.selectedperson.Name}</p></div>
                  <div className="deleteuser">
                    <button onClick={() => this.setState({ open: !this.state.open })}>-</button>
                  </div>
                </div>
              </div>
              <Spring
              config={{ duration: 200 }}
                from={{ opacity: 0 }}
                to={{ opacity: 1 }}>
                {props => <main style={props}>
                  <div className="mainblocks">        
                    <div className="calculation"><Calculation></Calculation></div>
                    
                    <div className="addvalues">
                    <div className="filling"></div>
                      <div className="App">
                        Syke
                        <div className="App">
                          <HeartBeatForm props={this.props} onChange={fieldsHeartBeat => this.onChangeHeartBeat(fieldsHeartBeat)} />
                          <p>
                          {JSON.stringify(this.state.fieldsHeartBeat.MeasureValue, null, 2)}
                          </p>
                        </div>
                        <br></br>
                        Paino
                        <div className="App">
                          <WeightForm props={this.props} onChange={fieldsWeight => this.onChangeWeight(fieldsWeight)} />  
                          <p>
                            {JSON.stringify(this.state.fieldsWeight.MeasureValue, null, 2)}
                          </p>
                       </div>
                       <br></br>
                       Vyötärö
                        <div className="App">
                          <WaistForm props={this.props} onChange={fieldsWaist => this.onChangeWaist(fieldsWaist)} />  
                          <p>
                            {JSON.stringify(this.state.fieldsWaist.MeasureValue, null, 2)}
                          </p>
                       </div>
                      </div>
                      <br></br> 
                    </div>
                  </div>
                  </main>}
                </Spring>
              <footer>
                <Link to="bottom" smooth={true} duration={1200}>
                  <div className="linktobottom">Arkkitehtuuri
                  </div>
                </Link>
                <a className="footertext" href="https://github.com/jartos" target="_blank" rel="noopener noreferrer">GitHub</a>
              </footer>
              {this.showDeleteUserModal()}
           </div>         
  };
}

const mapStateToProps = (state) => {
  return { 
    selectedperson: (state.selectedperson),
    heartbeats: (state.heartbeats),
    waist: (state.waist),
    weight: (state.weight),
    terveysdata: Object.values(state.terveysdata), // Objektin arvot taulukkoon
    persons: Object.values(state.persons)          // Objektin arvot taulukkoon
   }
    
};

export default connect(mapStateToProps, { 
  fetchPerson,
  fetchPersons,
  deletePerson,
  fetchMeasures,
  clearMeasures,
  clearSelectedPerson,
  createHeartBeat,
})(Main);
