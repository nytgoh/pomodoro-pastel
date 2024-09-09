import React from "react";

interface OutlineButtonProps {
    onClick: () => void;
    text: string;
    addRightMargin?: boolean;
}

export const OutlineButton: React.FC<OutlineButtonProps> = ({ onClick, text, addRightMargin = false}) => {
    return (
        <button
            className={`font-puritan text-darkPink text-lg border border-darkPink 
                        hover:bg-darkPink hover:text-white
                        transition-colors duration-300 ease-in-out
                        px-4 py-2 rounded ${addRightMargin ? "mr-3" : ""}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
};