import React from 'react';

interface IProps {
  programText: {
    message: string
    color: string
  } [];
}

export default function Terminal({
  programText,
}: IProps) {
  return (
    <div className="h-1/2 bg-black rounded-b p-2 overflow-y-auto">
      {
        programText.map((line, index) => (
          <p key={line + index.toString()} className="text-white text-sm">
            <span>ao:\&gt; </span>
            <span className={line.color === 'red' ? 'text-red-500' : ''}>{line.message}</span>
          </p>
        ))
      }
      <p className="text-white text-sm">
        <span>ao:\&gt; </span>
      </p>
    </div>
  );
}
