import React, { useState } from 'react';

export default function Info() {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <button
        className="m-4 shrink-0 w-40 h-20 border-gray-600 bg-gray-700 border-2 rounded"
        onClick={() => setOpened(!opened)}
        type="button"
      >
        Info
      </button>
      {opened && (
        <div className="absolute top-28 left-4 bg-gray-500 lg:w-96 w-56 rounded p-5 h-96 overflow-y-scroll">
          <button type="button" className="absolute top-0 right-0 p-4 bg-red-400" onClick={() => setOpened(!opened)}>
            <span className="font-semibold ">
              X
            </span>
          </button>
          <span className="font-semibold">
            Example Fibonacci Program
          </span>
          <br />
          <br />
          <p>
            MOV R0, #1
            <br />
            MOV R1, #1
            <br />
            fib:
            <br />
            MOV R2, R0
            <br />
            ADD R0, R0, R1
            <br />
            MOV R1, R2
            <br />
            B print
            <br />
            CMP R0, #40
            <br />
            BGT exit
            <br />
            B fib
            <br />
            exit:
            <br />
          </p>
          <br />
          <span className="font-semibold">
            Instruction Set
          </span>
          <br />
          <br />
          <p>
            ADD Rx, Ry, Op
            <span className="text-sm"> - Adds the value of Rx to Ry and stores the result in Rx.</span>
            <br />
            ADDS Rx, Ry, Op
            <span className="text-sm">
              {' '}
              - Adds the value of Rx to Ry and stores the result in Rx.
              Also stores the value in the CPSR (used for conditional branching).

            </span>
            <br />
            SUB Rx, Ry, Op
            <span className="text-sm"> - Subtracts the value of Ry from Rx and stores the result in Rx.</span>
            <br />
            SUBS Rx, Ry, Op
            <span className="text-sm">
              {' '}
              - Subtracts the value of Ry from Rx and stores the result in Rx.
              Also stores the value in the CPSR

            </span>
            <br />
            MOV Rx, Op
            <span className="text-sm"> - Stores the value of Op in Rx.</span>
            <br />
            AND Rx, Ry, Op
            <span className="text-sm"> - Ands the value of Rx and Ry and stores the result in Rx.</span>
            <br />
            ANDS Rx, Ry, Op
            <span className="text-sm">
              {' '}
              - Ands the value of Rx and Ry and stores the result in Rx.
              Also stores the value in the CPSR

            </span>
            <br />
            ORR Rx, Ry, Op
            <span className="text-sm"> - Ors the value of Rx and Ry and stores the result in Rx.</span>
            <br />
            ORRS Rx, Ry, Op
            <span className="text-sm">
              {' '}
              - Ors the value of Rx and Ry and stores the result in Rx.
              Also stores the value in the CPSR

            </span>
            <br />
            CMP Rx, Ry, Op
            <span className="text-sm"> - Compares the value of Rx and Ry and stores the result in the CPSR.</span>
            <br />
            B Op
            <span className="text-sm"> - Branches to the label Op.</span>
            <br />
            BNE Op
            <span className="text-sm"> - Branches to the label Op if the value in the CPSR is not equal to 0 (2 elements compared are not equal).</span>
            <br />
            BEQ Op
            <span className="text-sm"> - Branches to the label Op if the value in the CPSR is equal to 0 (2 elements compared are equal).</span>
            <br />
            BGT Op
            <span className="text-sm"> - Branches to the label Op if the value in the CPSR is greater than 0 (1st element compared is greater).</span>
            <br />
            BLT Op
            <span className="text-sm"> - Branches to the label Op if the value in the CPSR is less than 0 (1st element compared is less).</span>
            <br />
          </p>
        </div>
      )}
    </>
  );
}
