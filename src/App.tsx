import React, {useState} from 'react';
import Timer from "./Components/Timer";
import {Status} from "./Components/Types";
import StatusImages from "./Components/StatusImage";
import {WaveBorder} from "./Components/WaveBorder";

function App() {
  const [status, setStatus] = useState<Status>("Paused");
  return (
      <div className="relative min-h-screen bg-salmon flex flex-col">
          <div className="flex-grow z-10">
              <StatusImages status={status}/>
              <div className="absolute top-0 left-0 right-0 bottom-[50%] flex flex-col items-center justify-center z-20">
                  <Timer setStatus={setStatus} minutes={25}/>
              </div>
          </div>
          <WaveBorder/>
      </div>
  );
}

export default App;
