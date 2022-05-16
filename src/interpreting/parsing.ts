import { ProgramState } from "./state";
import Interpreter from "./interpreting";
export function beginParsing(
  text: string,
  state: ProgramState,
  setState: (state: ProgramState) => void,
  timer: NodeJS.Timeout | null
) {
  const lines = text.split("\n");
  // get rid of all commas
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
}
