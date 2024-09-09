import React, {useEffect, useState} from 'react';
import YouGotThis from "./Assets/YouGotThis.png"
import ReadyToFocus from "./Assets/ReadyToFocus.png"
import BreakTime from "./Assets/BreakTime.png"
import {Status} from "./Types";

interface StatusImageProps {
    status: Status;
}

const StatusImage: React.FC<StatusImageProps> = ({ status }) => {
    // State to handle opacity
    const [opacity, setOpacity] = useState(0);
    
    useEffect(() => {
        setOpacity(0);
        
        const timer = setTimeout(() => setOpacity(100), 100);

        return () => clearTimeout(timer);
    }, [status]);
    
    let imageSrc, altText;
    useEffect(() => {
        console.log(opacity);
    }, [opacity]);

    // Update image source and alt text based on the status
    switch (status) {
        case "Paused":
            imageSrc = ReadyToFocus;
            altText = "Ready to focus";
            break;
        case "Running":
            imageSrc = YouGotThis;
            altText = "You got this";
            break;
        case "Break":
            imageSrc = BreakTime;
            altText = "Break time";
            break;
        default:
            return null;
    }

    return (
        <img
            src={imageSrc}
            alt={altText}
            className={`opacity-${opacity} transition-opacity duration-500 ease-in-out fixed bottom-[12vw] ${getPositionForStatus(status)} h-[30vw] max-h-[500px]`}
        />
    );
};

const getPositionForStatus = (status: Status) => {
    switch (status) {
        case "Paused":
            return "left-[5vw]";
        case "Running":
            return "left-1/2 transform -translate-x-1/2";
        case "Break":
            return "right-[5vw]";
        default:
            return "";
    }
};


export default StatusImage;
