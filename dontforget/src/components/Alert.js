import { useEffect, useRef, useState } from "react";


const Alert = (props) => {

    const [timeToExit, setTimeToExit] = useState(false);
    const timeToExitRef = useRef(false);
    const loadingTime = (props.data.loadingTime !== undefined) ? props.data.loadingTime : 3000;

    const style = {
        top: "10px",
        right: "10px",
        position: "absolute",
        padding: "10px",
        background: (props.data.color !== undefined) ? props.data.color : "green",
        color: (props.data.textColor !== undefined) ? props.data.textColor : "white",
        filter: "drop-shadow(0px 0px 3px #aaa)",
        borderRadius: "5px",
    };

    const wait = () => {
        setTimeout(() => {
            setTimeToExit(true);
            timeToExitRef.current = true;
        }, loadingTime);
    }

    useEffect(() => {

        if (timeToExitRef.current === false) {
            wait();
        }

        if (timeToExitRef.current === true) {
            props.onReturnMethod();
        }

    }, [timeToExit]);

    return (
        <>
            {timeToExit === false && props.data.message !== undefined
                ? <div style={style} >{props.data.message}</div>
                : null
            }
        </>
    )

}

export default Alert;