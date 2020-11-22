import { combineReducers } from 'redux';
import terveysdataReducer from './terveysdataReducer';
import personsReducer from './personsReducer';
import waist from './waists';
import heartbeat from './heartbeats';
import weight from './weights';
import selectedPerson from './selectedPerson';

import { reducer as formReducer } from 'redux-form';


export default combineReducers({

  selectedperson: selectedPerson,
  weight: weight,
  heartbeat: heartbeat,
  waist: waist,
  persons: personsReducer,
  terveysdata: terveysdataReducer,
  
  form: formReducer

});
