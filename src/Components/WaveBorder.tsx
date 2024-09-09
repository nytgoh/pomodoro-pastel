import React from "react";
import { ReactComponent as Wave } from "./Assets/Wave.svg"

export const WaveBorder = () => (<div className="fixed inset-x-0 bottom-[-35vw] overflow-hidden">
    <Wave className="w-full h-auto block"/>
</div>);