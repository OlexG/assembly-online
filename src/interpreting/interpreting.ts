import { ProgramState } from "./state";
import { Arithmetic } from "./execution/arithmetic";

export default class Interpreter {
  static arithmeticInstructions = {
    'ADD': 4,
    'SUB': 4,
    'MUL': 4,
    'MOV': 3,
    'AND': 4,
    'ORR': 4,
  }

  static arithmeticInstruction(
    tokens: string[],
    state: ProgramState,
  ) {
    const instruction = tokens[0].toUpperCase();
    // @ts-ignore
    Arithmetic.execute[instruction](tokens, state);
  }
}
