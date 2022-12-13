import React, { useRef, useState } from 'react';
import { ProgramState } from './interpreting/state';

type IProps = {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  state: ProgramState
}

export default function TextArea({
  value,
  setValue,
  state,
}: IProps) {
  const textArea = useRef<HTMLTextAreaElement>(null);
  const lineBar = useRef<HTMLDivElement>(null);
  const [lineCount, setLineCount] = useState(100);
  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setValue(event.target.value);
    setLineCount(Math.max(event.target.value.split('\n').length, lineCount));
    if (lineBar.current && textArea.current) {
      // scroll to end of text area
      textArea.current.scrollTop = textArea.current.scrollHeight;
      lineBar.current.scrollTop = textArea.current.scrollTop;
    }
  }
  return (
    <div className="lg:w-1/2 w-full h-full p-4 flex flex-row">
      <div ref={lineBar} className="lineBar border-gray-600 border py-4 bg-white w-12 rounded-l-lg overflow-y-auto">
        {
          Array.from(Array(lineCount).keys()).map(
            (lineNumber) => (
              <div
                key={lineNumber}
                className={`text-center text-black ${lineNumber === state.currentLine - 1 ? 'bg-green-300' : ''} ${
                  lineNumber === state.error.line ? 'bg-red-300' : ''
                }`}
              >
                {lineNumber}
              </div>
            ),
          )
        }
      </div>
      <textarea
        ref={textArea}
        value={value}
        onChange={handleChange}
        className="text-black text-lg border-gray-600 border p-4 pb-6 rounded-r-lg lg:h-full w-full"
      />
    </div>
  );
}
