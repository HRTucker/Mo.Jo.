import React from "react";
import { arc} from "d3-shape";
import { scaleLinear } from "d3-scale";
import './GaugeMeter.css';

const GaugeMeter = ({value = 50, min=0, max=100, label, units}) => {
    const backgroundArc = arc()
        .innerRadius(0.9)
        .outerRadius(1)
        .startAngle(-Math.PI / 2)
        .endAngle(Math.PI / 2)
        .cornerRadius(0)
        ()

    const percentScale = scaleLinear()
        .domain([min,max])
        .range([0,1])
    const percent = percentScale(value)

    const angleScale = scaleLinear()
        .domain([0,1])
        .range([-Math.PI / 2, Math.PI / 2])
        .clamp(true)
    const angle = angleScale(percent)

    const filledArc = arc()
        .innerRadius(0.91)
        .outerRadius(0.99)
        .startAngle(-Math.PI / 2)
        .endAngle(angle)
        .cornerRadius(0)
        ()



    return(
        <div>
            <svg
                width="9em"
                viewBox={[-1, -1, 2, 1].join(" ")}
                style={{
                    border: "1px solid pink"
                }}>
                <path
                    d={backgroundArc}
                    fill="#000000"
                />
                <path
                    d={filledArc}
                    fill="#ffffff"
                />
            </svg>
        </div>
    )
}

export default GaugeMeter;
