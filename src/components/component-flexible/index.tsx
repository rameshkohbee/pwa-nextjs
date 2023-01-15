/* eslint-disable  @typescript-eslint/explicit-module-boundary-types */

import React, { useRef, useLayoutEffect, useState } from "react";

export const ComponentWithDimensions = ({ children }) => {
    const targetRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    // holds the timer for setTimeout and clearInterval
    let movement_timer = 0;

    // the number of ms the window size must stay the same size before the
    // dimension state variable is reset
    const RESET_TIMEOUT = 100;

    const test_dimensions = () => {
        // For some reason targetRef.current.getBoundingClientRect was not available
        // I found this worked for me, but unfortunately I can't find the
        // documentation to explain this experience
        if (targetRef.current != undefined) {
            setDimensions({
                width: targetRef.current.offsetWidth,
                height: targetRef.current.offsetHeight,
            });
        }
    };

    // This sets the dimensions on the first render
    useLayoutEffect(() => {
        test_dimensions();
    }, []);

    // every time the window is resized, the timer is cleared and set again
    // the net effect is the component will only reset after the window size
    // is at rest for the duration set in RESET_TIMEOUT.  This prevents rapid
    // redrawing of the component for more complex components such as charts
    if (typeof window !== "undefined") {
        window.addEventListener("resize", () => {
            clearInterval(movement_timer);
            movement_timer = window.setTimeout(test_dimensions, RESET_TIMEOUT);
        });
    }

    return (
        <div ref={targetRef} style={{ height: (dimensions.width * 9) / 16 }}>
            {children}
        </div>
    );
};

export default ComponentWithDimensions;
