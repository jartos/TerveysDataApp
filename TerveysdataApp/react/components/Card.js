import React from 'react';
import {useSpring, animated} from 'react-spring'
import '../App.css';

const Card = ()=> {
  const [props, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 20, tension: 350, friction: 40 } }))
  return (
    <div class="card">
    
    <div class="container">
      <h4><b>John Doe</b></h4> 
      <p>Architect  Engineer</p> 
    </div>
  </div>
  )
}

export default Card;