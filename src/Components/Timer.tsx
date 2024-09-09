import React, {useEffect, useRef, useState} from "react";
import Countdown, {CountdownRenderProps} from "react-countdown";
import {Action, Status} from "./Types";
import {ActionButton} from "./ActionButton";
import {OutlineButton} from "./OutlineButton";
import useSound from 'use-sound';
// @ts-ignore
import ZapsplatNotificationBellSound from './Assets/ZapsplatNotificationBellSound.mp3';

interface TimerProps {
    setStatus: React.Dispatch<React.SetStateAction<Status>>;
    minutes: number;
}

interface TimerStage {
    status: Status;
    time: number;
}

const Timer: React.FC<TimerProps> = ({setStatus, minutes}) => {
    const millisecondsInMinute = 60000;
    const timerStages: TimerStage[] = [
        {status: "Paused", time: 1},
        {status: "Break", time: 5},
        {status: "Paused", time: 25},
        {status: "Break", time: 5},
        {status: "Paused", time: 25},
        {status: "Break", time: 5},
        {status: "Paused", time: 25},
        {status: "Break", time: 15}
    ];

    const getCountdownTime = (stage: number) => {
        const currentTime = Date.now();
        const targetTime = currentTime + (timerStages[stage].time * millisecondsInMinute);
        return Math.ceil(targetTime / 1000) * 1000; // Round to nearest second
    };

    const [stageTracker, setStageTracker] = useState(0);
    const [countdownDate, setCountdownDate] = useState(getCountdownTime(stageTracker));
    const [play] = useSound(ZapsplatNotificationBellSound);
    const [visibleButtons, setVisibleButtons] = useState<Action[]>(['start']);
    const [title, setTitle] = useState("Ready to Start?");
    const [timeLeft, setTimeLeft] = useState<string>("");

    const nextStage = stageTracker + 1 >= timerStages.length ? 0 : stageTracker + 1;
    const previousStage = stageTracker - 1 <= 0 ? 0 : stageTracker - 1;

    // Store the formatted time using useRef to prevent updates during rendering
    const formattedTimeRef = useRef<string>("");

    // Update document title with current countdown time and title
    useEffect(() => {
        if (timeLeft) {
            document.title = `${timeLeft} - ${title}`;
        } else {
            document.title = title;
        }
    }, [timeLeft, title]);

    // Use useEffect to safely update the timeLeft state after rendering
    useEffect(() => {
        setTimeLeft(formattedTimeRef.current);
    }, [formattedTimeRef.current]);
    
    const isOnBreak = (stage: number) => timerStages[stage].status === "Break";

    const onComplete = () => {
        setCountdownDate(getCountdownTime(nextStage));
        setStatus(timerStages[nextStage].status);
        setStageTracker(nextStage);
    };

    const onBack = () => {
        setCountdownDate(getCountdownTime(previousStage));
        setStatus(timerStages[previousStage].status);
        setStageTracker(previousStage);
    };

    const updateState = (title: string, status: Status, visibleButtons: Action[]) => {
        setTitle(title)
        setStatus(status);
        setVisibleButtons(visibleButtons);
    }

    const handleAction = (action: Action, props: CountdownRenderProps) => {
        switch (action) {
            case 'start':
                props.api.start();
                updateState(isOnBreak(stageTracker) ? "Break Time" : "Focus Time", isOnBreak(stageTracker) ? "Break" : "Running", ['pause']);
                break;
            case 'pause':
                props.api.pause();
                updateState("Ready to Continue?", "Paused", ['resume', 'stop']);
                break;
            case 'resume':
                props.api.start();
                updateState(isOnBreak(stageTracker) ? "Break Time" : "Focus Time", isOnBreak(stageTracker) ? "Break" : "Running", ['pause']);
                break;
            case 'stop':
                props.api.stop();
                console.log('stop')
                updateState("Ready to Start?", "Paused", ['start']);
                break;
            default:
                break;
        }
    };


    return (
        <div>
            <Countdown
                date={countdownDate}
                intervalDelay={0}
                precision={3}
                controlled={false}
                autoStart={false}
                onComplete={() => {
                    onComplete();
                    play();
                    updateState("Ready to Start?", "Paused", ['start']);
                }}
                renderer={props => {
                    const formattedTime = `${props.formatted.minutes}:${props.formatted.seconds}`;
                    formattedTimeRef.current = formattedTime;

                    return (<div className="text-center">
                        <p className="font-nova text-96 text-offWhite text-stroke mb-0 leading-none">{formattedTime}</p>
                        <p className="font-puritan text-2xl text-darkPink leading-none font-bold mb-10">{title}</p>
                        <div className="flex space-x-4 justify-center mb-7">
                            {visibleButtons.map((action: Action) => <ActionButton key={action}
                                onClick={() => handleAction(action, props)} action={action}/>)}
                        </div>
                        <div className={"text-center mt-10"}>
                            {stageTracker > 0 &&
                                <OutlineButton onClick={() => {
                                    onBack();
                                    handleAction('stop', props);
                                }} text={"Back"} addRightMargin/>}
                            <OutlineButton onClick={() => {
                                onComplete();
                                handleAction('stop', props);
                            }}
                            text={`Up Next: ${isOnBreak(nextStage) ? "Break" : "Focus Time"} (${timerStages[nextStage].time}min)`}/>
                        </div>
                    </div>)

                }}
            />


        </div>
    )
        ;
}

export default Timer;
