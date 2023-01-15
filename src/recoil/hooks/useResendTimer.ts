import { useEffect, useRef, useState } from "react";

const useResendTimer = (
    initialTime: number,
): { time: any; start: any; stop: any; reset: any; isOn: any } => {
    const [time, setTime] = useState<number>(initialTime); // in seconds
    const [isOn, setIsOn] = useState<boolean>(false);
    const timerId = useRef<any>();
    const start = () => {
        if (time > 0) {
            setIsOn(true);
            timerId.current = setInterval(() => {
                setTime((pre: number) => pre - 1);
            }, 1000);
        }
    };
    const stop = () => {
        setIsOn(false);
        clearInterval(timerId.current);
        timerId.current = null;
    };

    const reset = () => {
        setIsOn(false);
        clearInterval(timerId.current);
        timerId.current = null;
        setTime(initialTime);
    };
    useEffect(() => {
        if (time === 0) {
            setIsOn(false);
            clearInterval(timerId.current);
            timerId.current = null;
            setTime(initialTime);
        }
    }, [time, initialTime]);

    useEffect(() => {
        return () => {
            setIsOn(false);
            clearInterval(timerId.current);
            timerId.current = null;
        };
    }, []);
    return {
        time,
        start,
        stop,
        reset,
        isOn,
    };
};

/**
 *
 * @param seconds
 * @returns formated time (00:00)
 */
const getFormatedResendTime = (seconds: number): string => {
    const sec = seconds % 60;
    const min = Math.floor(seconds / 60) % 60;
    return `${min > 9 ? min : "0" + min}:${sec > 9 ? sec : "0" + sec}`;
};

export { useResendTimer, getFormatedResendTime };
