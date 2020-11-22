import React from 'react';
import Main from './Main';
import Clouds from './Clouds';
import { animateScroll as scroll } from 'react-scroll'
import '../App.css';

const App = () => {
  return (
<div>
  <Main />
  < Clouds />
  <div id="bottom" ></div>
</div>
  );
};

export default App;
