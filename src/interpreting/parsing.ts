import { ProgramState } from "./state";
import Interpreter from "./interpreting";
import { Labels } from "./execution/labels";
export function beginParsing(
  text: string,
  state: ProgramState,
  setState: (state: ProgramState) => void,
  timer: NodeJS.Timeout | null
) {
  const lines = text.split("\n");
  // get rid of all commas
  // populate labes if not already populated
  if (Object.keys(state.labels).length === 0) {
    let currentPC = 0;
    let currentLine = 0;
    lines.forEach((line, index) => {
      if (Labels.isLabel(line, state)) {
        const label = line.split(":")[0];
        state.labels[label] = currentPC;
        state.pcToLineNumber[currentPC] = currentLine;
        currentPC += 1;
        currentLine += 1;
      } else {
        if (line.trim() !== "") {
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
  if (line === "") {
    state.currentLine++;
    beginParsing(text, state, setState, timer);
    return;
  }

  const tokens = line.split(",").map((t) => t.trim());
  line = tokens.join(" ");
  delegateLine(line, state);
  state.PC++;
  state.currentLine++;
  setState(state);
}

function delegateLine(line: string, state: ProgramState) {
  // split by all whitespace
  const tokens = line.split(/\s+/);
  if (
    Object.keys(Interpreter.arithmeticInstructions).includes(
      tokens[0].toUpperCase()
    )
  ) {
    if (
      tokens.length !==
      // @ts-ignore
      Interpreter.arithmeticInstructions[tokens[0].toUpperCase()]
    ) {
      throw new Error(`Invalid number of arguments for ${tokens[0]}`);
    }
    Interpreter.arithmeticInstruction(tokens, state);
  }
  if (
    Object.keys(Interpreter.branchInstructions).includes(
      tokens[0].toUpperCase()
    )
  ) {
    if (
      tokens.length !==
      // @ts-ignore
      Interpreter.branchInstructions[tokens[0].toUpperCase()]
    ) {
      throw new Error(`Invalid number of arguments for ${tokens[0]}`);
    }
    Interpreter.branchInstruction(tokens, state);
  }
}
