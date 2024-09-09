import React, {useEffect, useState} from "react";
import {WaveBorder} from "./WaveBorder";
import {Status} from "./Types";
import Timer from "./Timer";
import ReadyToFocus from "./Assets/ReadyToFocus.png";
import YouGotThis from "./Assets/YouGotThis.png";
import BreakTime from "./Assets/BreakTime.png";

const MainScreen = () => {
    const [status, setStatus] = useState<Status>("Paused");

    const opacityMap = {
        Paused: { opacityP: 100, opacityR: 0, opacityB: 0 },
        Running: { opacityP: 0, opacityR: 100, opacityB: 0 },
        Break: { opacityP: 0, opacityR: 0, opacityB: 100 },
    };

    const { opacityP, opacityR, opacityB } = opacityMap[status];

    return (
        <div className="relative min-h-screen bg-salmon">
            <div className="absolute top-0 left-0 right-0 bottom-[50%] flex flex-col items-center justify-center">
                <Timer setStatus={setStatus} minutes={25}/>
            </div>
            <WaveBorder/>
            <img
                src={ReadyToFocus}
                alt={"Ready to focus"}
                className={`opacity-${opacityP} transition-opacity duration-500 ease-in-out fixed bottom-[12vw] left-[5vw] h-[30vw] max-h-[500px]`}
            />
            <img
                src={YouGotThis}
                alt={"You got this"}
                className={`opacity-${opacityR} transition-opacity duration-500 ease-in-out fixed bottom-[12vw] left-1/2 transform -translate-x-1/2 h-[30vw] max-h-[500px]`}
            />
            <img
                src={BreakTime}
                alt={"Break time"}
                className={`opacity-${opacityB} transition-opacity duration-500 ease-in-out fixed bottom-[12vw] right-[5vw] h-[30vw] max-h-[500px]`}
            />
        </div>
    )
}

export default MainScreen;
