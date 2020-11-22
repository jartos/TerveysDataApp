import React from 'react'
import { useSpring, animated } from 'react-spring'
import { animateScroll as scroll } from 'react-scroll'
import '../App.css'

const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2]
const trans2 = (x, y) => `translate3d(${x / 50 + 5}px,${y / 50 - 50}px,0)`

function Clouds() {
  const [props, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 300, tension: 150, friction: 150 } }))
  return (
    <div className="cloudscontainer" onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}>
            <div class="cloud">
        <animated.div class="docker" style={{ transform: props.xy.interpolate(trans2) }} />
        <div className="top" onClick={() => scroll.scrollToTop()}>
          <div className="toptext">
            Takaisin
          </div>
        </div>
      </div>
    </div>
  )
}

export default Clouds;