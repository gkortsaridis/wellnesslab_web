import * as React from 'react';
import {useRef, useState} from "react";
import { useSpring, animated } from 'react-spring'
import './styles.css'

const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

export default function WellnessCard(props) {
    const inputRef = useRef()

    const [hovering, setHover] = useState(false)

    const [stuff, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }))

    const cardStyle = {
        card: {
            width: props.width,
            height: props.height,
            backgroundPosition: 'center center',
            boxShadow: hovering ? '10px 10px 30px -5px rgba(0, 0, 0, 0.7)': '0px 10px 30px -5px rgba(0, 0, 0, 0.3)',
            transition: 'box-shadow 0.5s',
            willChange: 'transform',
            borderRadius: props.borderRadius,
            display: 'flex',
            overflow: 'hidden'
        }
    }

    function calc(x,y) {
        const offsetTop = inputRef.current.offsetTop
        const offsetLeft = inputRef.current.offsetLeft
        //console.log(x,y, offsetTop, offsetLeft)

        //Calculating Y percentage [-10,10]
        const height = props.height
        var percentageInsideY = offsetTop+height-y
        if(percentageInsideY < 0) { percentageInsideY = 0 }
        else if(percentageInsideY > height) { percentageInsideY = height }

        var old_value = percentageInsideY
        var old_min = 0
        var old_max = height
        var new_min = -10
        var new_max = 10
        var new_valueY = ( (old_value - old_min) / (old_max - old_min) ) * (new_max - new_min) + new_min

        //Calculating X percentage [-10,10]
        const width = props.width
        var percentageInsideX = offsetLeft+width-x
        if(percentageInsideX < 0) { percentageInsideX = 0 }
        else if(percentageInsideX > width) { percentageInsideX = width }

        var old_value = percentageInsideX
        var old_min = 0
        var old_max = width
        var new_min = -10
        var new_max = 10
        var new_valueX = ( (old_value - old_min) / (old_max - old_min) ) * (new_max - new_min) + new_min

        return [new_valueY, -new_valueX, 1]
    }

    return (
        <animated.div
            ref={inputRef}
            class="card"
            onMouseMove={(e) => {
                if(!props.disableMove) {
                    set({ xys: calc(e.clientX, e.clientY) })
                }
            }}
            onMouseLeave={() => {
                setHover(false)
                set({ xys: [0, 0, 1] })
            }}
            onMouseEnter={() => setHover(true)}
            style={Object.assign(props.style | {}, cardStyle.card, { transform: stuff.xys.interpolate(trans) })}
            onClick={props.onCardClick}>
            {props.children}
        </animated.div>
    )
}