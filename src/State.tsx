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
    if (state.PC === 0) {
      // state was reset
      setProgramText([]);
    }
  }, [state, watchVariable, setWatchVariable, setState]);

  return (
    <div className="border-gray-600 border-2 m-4 rounded w-1/2">
      <div className="w-10 h-1/2 flex flex-col flex-wrap">
        {
        state.getAllRegisters().map(
          (register) => (
            <div key={register.name} className="m-2 w-20 h-20 flex flex-row text-center items-center justify-center border-gray-600 bg-gray-700 border-2 rounded">
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
