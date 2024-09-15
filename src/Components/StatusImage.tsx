import React, {useEffect, useState} from "react";
import {Status} from "./Types";
import ReadyToFocus from "./Assets/ReadyToFocus.png";
import YouGotThis from "./Assets/YouGotThis.png";
import BreakTime from "./Assets/BreakTime.png";

interface StatusImagesProps {
    status: Status;
}

const StatusImages: React.FC<StatusImagesProps> = ({status}) => {
    const [opacity, setOpacity] = useState<{ Paused: number, Running: number, Break: number }>({ Paused: 0, Running: 0, Break: 0 });

    useEffect(() => {
        const updatedOpacity = { ...opacity };

        for (const key in opacity) {
            if (!opacity.hasOwnProperty(key)) continue;

            if (key === status) {
                updatedOpacity[key as keyof typeof opacity] = 1;  // Set opacity to 1 for visibility
            } else {
                updatedOpacity[key as keyof typeof opacity] = 0;  // Set opacity to 0 for hiding
            }
        }

        setOpacity(updatedOpacity);
    }, [status]);

    return (
        <div>
            <img
                src={ReadyToFocus}
                alt={"Ready to focus"}
                style={{ opacity: opacity.Paused, transition: "opacity 0.5s ease-in-out" }}  // Inline opacity and transition
                className="fixed bottom-[12vw] left-[5vw] h-[30vw] max-h-[500px] min-h-[200px]"
            />
            <img
                src={YouGotThis}
                alt={"You got this"}
                style={{ opacity: opacity.Running, transition: "opacity 0.5s ease-in-out" }}  // Inline opacity and transition
                className="fixed bottom-[5vw] left-1/2 transform -translate-x-1/2 h-[30vw] max-h-[500px] min-h-[200px]"
            />
            <img
                src={BreakTime}
                alt={"Break time"}
                style={{ opacity: opacity.Break, transition: "opacity 0.5s ease-in-out" }}  // Inline opacity and transition
                className="fixed bottom-[12vw] right-[5vw] h-[30vw] max-h-[500px] min-h-[200px]"
            />
        </div>
    );
};

export default StatusImages;
