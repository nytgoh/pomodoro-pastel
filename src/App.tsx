import React, {useState} from 'react';
import Timer from "./Components/Timer";
import {Status} from "./Components/Types";
import StatusImages from "./Components/StatusImage";
import {WaveBorder} from "./Components/WaveBorder";

function App() {
  const [status, setStatus] = useState<Status>("Paused");
  return (
      <div className="relative min-h-screen bg-salmon">
        <div className="absolute top-0 left-0 right-0 bottom-[50%] flex flex-col items-center justify-center">
          <Timer setStatus={setStatus} minutes={25}/>
        </div>
        <WaveBorder/>
        <StatusImages status={status}/>
      </div>
  );
}

export default App;
