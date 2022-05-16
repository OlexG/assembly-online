import TextArea from './TextArea';
import State from './State';
import { ProgramState } from './interpreting/state';
import { useState, useRef } from 'react';
import { beginParsing } from './interpreting/parsing';

function App() {
  const [state, setState] = useState<ProgramState>( new ProgramState() );
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [programText, setProgramText] = useState<string>('');
  const [programRunning, setProgramRunning] = useState(false);

  function advanceProgram() {
    beginParsing(programText, state, setState, timer.current);
    setProgramRunning(!programRunning);
  }

  function advanceWithoutUpdate() {
    beginParsing(programText, state, setState, timer.current);
  }

  function resetProgram() {
    setProgramRunning(false);
    setState(new ProgramState());
    if (timer.current) {
      clearTimeout(timer.current);
    }
  }

  function startProgram() {
    advanceWithoutUpdate();
    setProgramRunning(e => !e);
    timer.current = setInterval(() => {
      advanceWithoutUpdate();
      setProgramRunning(e => !e);
    }, 1000);
  }

  function pauseProgram() {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }

  return (
    <div className='h-screen flex flex-col justify-end bg-gray-800 text-white text-lg'>
      <div className='flex flex-row h-1/7 justify-center'>
        <button className='m-4 shrink-0 w-40 border-gray-600 bg-gray-700 border-2 rounded' onClick={startProgram}>
          Run
        </button>
        <button className='m-4 shrink-0 w-40 border-gray-600 bg-gray-700 border-2 rounded' onClick={pauseProgram}>
          Pause
        </button>
        <button className='m-4 shrink-0 w-40 border-gray-600 bg-gray-700 border-2 rounded' onClick={advanceProgram}>
          Advance
        </button>
        <button className=' m-4 shrink-0 w-40 border-gray-600 bg-gray-700 border-2 p-4 rounded' onClick={resetProgram}>
          Reset
        </button>
      </div>
      <div className="flex flex-row w-screen h-6/7">
        <TextArea
          value={programText}
          setValue={setProgramText}
          state={state}
        ></TextArea>
        <State state={state}></State>
      </div>
    </div>
  );
}

export default App;
