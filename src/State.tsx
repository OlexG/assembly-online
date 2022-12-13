import React, { useState, useEffect } from 'react';
import { ProgramState } from './interpreting/state';
import Terminal from './Terminal';

type IProps = {
  state: ProgramState,
  setState: React.Dispatch<React.SetStateAction<ProgramState>>,
  watchVariable: boolean,
  setWatchVariable: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function State({
  state,
  setState,
  watchVariable,
  setWatchVariable,
}: IProps) {
  const [programText, setProgramText] = useState<{
    message: string,
    color: string
  }[]>([]);
  useEffect(() => {
    if (state.messages.length > 0) {
      setProgramText((e) => [...e, ...state.messages.map((m) => ({
        message: m.message,
        color: 'white',
      }))]);
      setState((e) => {
        e.messages.length = 0;
        return e;
      });
    }
    if (state.error.message && !state.error.outputed) {
      setProgramText((e) => [...e, {
        message: (state.error.message as Error).message,
        color: 'red',
      }]);
      setState((e) => {
        e.error.outputed = true;
        return e;
      });
    }
    if (state.PC === 0) {
      // state was reset
      setProgramText([]);
    }
  }, [state, watchVariable, setWatchVariable, setState]);

  return (
    <div className="border-gray-600 border-2 m-4 rounded lg:w-1/2 w-3/4 mx-auto">
      <div className="lg:w-10 lg:h-1/2 flex lg:flex-col flex-row flex-wrap">
        {
        state.getAllRegisters().map(
          (register) => (
            <div key={register.name} className="lg:m-2 m-4 w-20 h-20 flex flex-row text-center items-center justify-center border-gray-600 bg-gray-700 border-2 rounded">
              {register.name}
              :
              {' '}
              {register.value}
            </div>
          ),
        )
      }
      </div>
      <Terminal programText={
        programText
      }
      />
    </div>
  );
}
