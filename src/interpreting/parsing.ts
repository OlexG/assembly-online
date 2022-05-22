/* eslint-disable no-param-reassign */
import React from 'react';
import { ProgramState } from './state';
import Interpreter from './interpreting';
import Labels from './execution/labels';

function delegateLine(line: string, state: ProgramState) {
  // split by all whitespace
  const tokens = line.split(/\s+/);
  if (
    Object.keys(Interpreter.arithmeticInstructions).includes(
      tokens[0].toUpperCase(),
    )
  ) {
    if (
      tokens.length
      // @ts-ignore
      !== Interpreter.arithmeticInstructions[tokens[0].toUpperCase()]
    ) {
      throw new Error(`Invalid number of arguments for ${tokens[0]}`);
    }
    Interpreter.arithmeticInstruction(tokens, state);
  }
  if (
    Object.keys(Interpreter.branchInstructions).includes(
      tokens[0].toUpperCase(),
    )
  ) {
    if (
      tokens.length
      // @ts-ignore
      !== Interpreter.branchInstructions[tokens[0].toUpperCase()]
    ) {
      throw new Error(`Invalid number of arguments for ${tokens[0]}`);
    }
    Interpreter.branchInstruction(tokens, state);
  }
}

export default function beginParsing(
  text: string,
  state: ProgramState,
  setState: React.Dispatch<React.SetStateAction<ProgramState>>,
  // eslint-disable-next-line no-undef
  timer: NodeJS.Timeout | null,
) {
  if (state.error.message !== null) {
    return;
  }
  const lines = text.split('\n');

  // populate labes if not already populated
  if (Object.keys(state.labels).length === 0) {
    let currentPC = 0;
    let currentLine = 0;
    lines.forEach((line) => {
      if (Labels.isLabel(line, state)) {
        const label = line.split(':')[0];
        state.labels[label] = currentPC;
        state.pcToLineNumber[currentPC] = currentLine;
        currentPC += 1;
        currentLine += 1;
      } else {
        if (line.trim() !== '') {
          state.pcToLineNumber[currentPC] = currentLine;
          currentPC += 1;
        }
        currentLine += 1;
      }
    });
  }

  let line = lines[state.currentLine];
  if (line === undefined) {
    if (timer) {
      clearTimeout(timer);
    }
    return;
  }
  // get rid of comments
  // eslint-disable-next-line prefer-destructuring
  line = line.split('//')[0];
  if (line === '') {
    state.currentLine += 1;
    beginParsing(text, state, setState, timer);
    return;
  }

  // get rid of all commas
  const tokens = line.split(',').map((t) => t.trim());
  line = tokens.join(' ');
  try {
    delegateLine(line, state);
  } catch (e: any) {
    state.error = {
      message: e,
      line: state.currentLine,
      outputed: false,
    };
  }

  state.PC += 1;
  state.currentLine += 1;
  setState(state);
}
