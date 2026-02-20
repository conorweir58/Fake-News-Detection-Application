import { useEffect, useRef } from "react";

function CircularProgress({ value }) {

    const circleRef = useRef(null)

    useEffect(() => {
    const circle = circleRef.current;
    if (!circle) return;

    const radius = circle.r.baseVal.value;
    if (!radius) return;

    const circumference = radius * Math.PI * 2;

    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = circumference; // start empty
    }, []);


    useEffect(() => {
        const circle = circleRef.current;
        if (!circle) return;

        const radius = circle.r.baseVal.value;
        if (!radius) return;

        const circumference = radius * Math.PI * 2;

        const offset = circumference - (value/100) * circumference;
        circle.style.strokeDashoffset = offset;
    }, [value])


    return (
        <div className="circularWrapper">
            <svg className="result-svg">
                <circle className="bg" cx="70" cy="70" r="60" />
                <circle ref={circleRef} className="progress" cx="70" cy="70" r="60" />
            </svg>
        </div>
    );
}

export default CircularProgress;