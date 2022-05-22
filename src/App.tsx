import React, { useState, useRef } from 'react';
import TextArea from './TextArea';
import State from './State';
import Info from './Info';
import { ProgramState } from './interpreting/state';
import beginParsing from './interpreting/parsing';

function App() {
  const [state, setState] = useState<ProgramState>(new ProgramState());
  // eslint-disable-next-line no-undef
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [programText, setProgramText] = useState<string>('');
  const [updateProgram, setUpdateProgram] = useState(false);
  const [timeBetweenSteps, setTimeBetweenSteps] = useState(100);

  function advanceProgram() {
    beginParsing(programText, state, setState, timer.current);
    setUpdateProgram(!updateProgram);
  }

  function advanceWithoutUpdate() {
    beginParsing(programText, state, setState, timer.current);
  }

  function resetProgram() {
    setUpdateProgram(false);
    setState(new ProgramState());
    if (timer.current) {
      clearTimeout(timer.current);
    }
  }

  function startProgram() {
    advanceWithoutUpdate();
    setUpdateProgram((e) => !e);
    timer.current = setInterval(() => {
      advanceWithoutUpdate();
      setUpdateProgram((e) => !e);
    }, timeBetweenSteps);
  }

  function pauseProgram() {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }

  return (
    <div className="h-screen flex flex-col justify-end bg-gray-800 text-white text-lg">
      <div className="flex flex-row h-1/7 justify-center">
        <Info />
        <button
          className="m-4 shrink-0 w-40 border-gray-600 bg-gray-700 border-2 rounded"
          onClick={startProgram}
          type="button"
        >
          Run
        </button>
        <button
          className="m-4 shrink-0 w-40 border-gray-600 bg-gray-700 border-2 rounded"
          onClick={pauseProgram}
          type="button"
        >
          Pause
        </button>
        <button
          className="m-4 shrink-0 w-40 border-gray-600 bg-gray-700 border-2 rounded"
          onClick={advanceProgram}
          type="button"
        >
          Advance
        </button>
        <button
          className="m-4 shrink-0 w-40 border-gray-600 bg-gray-700 border-2 p-4 rounded"
          onClick={resetProgram}
          type="button"
        >
          Reset
        </button>
        <div className="text-sm m-4 shrink-0 w-40 border-gray-600 bg-gray-700 border-2 rounded">
          <span className="p-0.75 px-2">Time between steps:</span>
          <input
            className="w-20 mx-2 rounded text-black mt-2.5 px-1"
            value={timeBetweenSteps}
            type="number"
            min={1}
            onChange={(e) => setTimeBetweenSteps(parseInt(e.target.value, 10))}
          />
        </div>
      </div>
      <div className="flex flex-row w-screen h-6/7">
        <TextArea
          value={programText}
          setValue={setProgramText}
          state={state}
        />
        <State
          state={state}
          setState={setState}
          watchVariable={updateProgram}
          setWatchVariable={setUpdateProgram}
        />
      </div>
    </div>
  );
}

export default App;
