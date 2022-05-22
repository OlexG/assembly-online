/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { ProgramState } from '../state';

export default class Branches {
  static interpret(token: string, state: ProgramState) {
    if (state.isRegister(token)) {
      return 'register';
    }
    if (Object.keys(state.builtInFunctions).includes(token)) {
      return 'function';
    }
    if (!Object.keys(state.labels).includes(token)) {
      throw new Error(`Label ${token} not found`);
    }
    return 'label';
  }

  static execute = {
    B(
      tokens: string[],
      state: ProgramState,
    ) {
      const [operation, val1]: any[] = tokens;
      if (Branches.interpret(val1, state) === 'function') {
        // @ts-ignore
        state.builtInFunctions[val1]();
        return;
      }
      if (Branches.interpret(val1, state) !== 'label') {
        throw new Error('Destination is not a label');
      }
      const destination = val1;
      // @ts-ignore
      state.PC = state.labels[destination];
      state.currentLine = state.pcToLineNumber[state.PC];
    },
    BNE(
      tokens: string[],
      state: ProgramState,
    ) {
      if (state.CPSR === 0) {
        return;
      }
      Branches.execute.B(tokens, state);
    },
    BEQ(
      tokens: string[],
      state: ProgramState,
    ) {
      if (state.CPSR !== 0) {
        return;
      }
      Branches.execute.B(tokens, state);
    },
    BGT(
      tokens: string[],
      state: ProgramState,
    ) {
      if (state.CPSR <= 0) {
        return;
      }
      Branches.execute.B(tokens, state);
    },
    BLT(
      tokens: string[],
      state: ProgramState,
    ) {
      if (state.CPSR >= 0) {
        return;
      }
      Branches.execute.B(tokens, state);
    },
  };
}
