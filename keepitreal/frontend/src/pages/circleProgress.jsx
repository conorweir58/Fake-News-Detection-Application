import { useEffect, useRef } from "react";

function CircularProgress({value}) {

    const circleRef = useRef(null)

    useEffect(() => {
    const circle = circleRef.current;
    if (!circle) return;

    const radius = circle.r.baseVal.value;
    const circumference = radius * Math.PI * 2;

    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = circumference; // start empty
    }, []);


    useEffect(() => {
        const circle = circleRef.current;
        const radius = circle.r.baseVal.value;
        const circumference = radius * Math.PI * 2;

        const offset = circumference - (value/100) * circumference;
        circle.style.strokeDashoffset = offset;
    }, [value])


    return (
        <div className="circularWrapper">
            <svg>
                <circle className="bg" cx="57" cy="57" r="52" />
                <circle ref={circleRef} className="progress" cx="57" cy="57" r="52" />
            </svg>
            <div className="value">{Math.round(value)}%</div>
        </div>
    );
}

export default CircularProgress;