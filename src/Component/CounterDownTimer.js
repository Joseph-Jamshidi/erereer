import {useEffect, useState} from "react";

const CountDownTimer = ({timer, onFinished}) => {

    const {minutes = 0, seconds = 60} = timer;
    const [[mins, secs], setTime] = useState([minutes, seconds]);

    const tick = () => {
        if (mins === 0 && secs === 0) {
            clearInterval(timerId);
            reset();
        } else if (secs === 0) {
            setTime([mins - 1, 59]);
        } else {
            setTime([mins, secs - 1]);
        }
    };

    const timerId = setInterval(() => tick(), 1000);

    const reset = () => {
        clearInterval(timerId)
        setTime([parseInt('0'), parseInt('0')]);
        onFinished.call();
    };

    useEffect(() => {
        return () => clearInterval(timerId);
    });

    return (
        <span>
            {`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`}
        </span>
    );
};

export default CountDownTimer;