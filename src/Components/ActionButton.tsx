import React from "react";
import {Action} from "./Types";

interface ActionButtonProps {
    key: string;
    onClick: () => void;
    action: Action;
}

const actionTitles: Record<Action, string> = {
    start: "Start",
    pause: "Pause",
    resume: "Resume",
    stop: "Reset",
};

export const ActionButton: React.FC<ActionButtonProps> = ({onClick, action}) => {
    return (
        <button
            onClick={onClick}
            className="
            font-orienta
            px-12 py-2
            text-4xl text-white 
            bg-teal rounded-2xl border-2 border-offWhite text-shadow shadow-[0_2px_2px_0_#708BA0]"
        >
            {actionTitles[action]}
        </button>
    );
};