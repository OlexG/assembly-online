import { ProgramState } from "../state";

export class Branches {
  static interpret (token: string, state: ProgramState) {
    if (state.isRegister(token)) {
      return 'register';
    }
    if (!Object.keys(state.labels).includes(token)) {
      throw new Error(`Label ${token} not found`);
    }
    return 'label';
  }

  static execute = {
    'B': function (
      tokens: string[],
      state: ProgramState
    ) {
      let [operation, val1]: any[] = tokens;
      if (Branches.interpret(val1, state) !== 'label') {
        throw new Error('Destination is not a label');
      }
      const destination = val1;
      // @ts-ignore
      state.PC = state.labels[destination];
      state.currentLine = state.pcToLineNumber[state.PC];
    }
  }
}