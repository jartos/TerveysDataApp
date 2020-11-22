import React from 'react';
import {useSpring, animated} from 'react-spring'
import '../App.css';

const WelcomePage = ()=> {
  const props = useSpring({ config: { duration: 300 }, opacity: 1, from: {opacity: 0}})
  return <animated.div style={props}  className="welcomeimage">
        </animated.div>
}

export default WelcomePage;