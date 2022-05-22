/* eslint-disable no-bitwise */
/* eslint-disable no-param-reassign */
import { ProgramState, RegisterType } from '../state';

export default class Arithmetic {
  static interpret(token: string, state: ProgramState) {
    if (state.isRegister(token)) {
      return 'register';
    }
    try {
      const value = token.split('#')[1];
      if (value.includes('<<')) {
        const [num, shift] = value.split('<<');
        const numValue = parseInt(num.trim(), 10);
        const shiftValue = parseInt(shift.trim(), 10);
        // eslint-disable-next-line no-bitwise
        return numValue << shiftValue;
      } if (value.includes('>>')) {
        const [num, shift] = value.split('>>');
        const numValue = parseInt(num.trim(), 10);
        const shiftValue = parseInt(shift.trim(), 10);
        // eslint-disable-next-line no-bitwise
        return numValue >> shiftValue;
      }
      return parseInt(value.trim(), 10);
    } catch {
      throw new Error(`Could not parse ${token}`);
    }
  }

  static execute = {
    ADD(
      tokens: string[],
      state: ProgramState,
    ) {
      const val1 = tokens[1];
      const val2 = tokens[2];
      let val3: any = tokens[3];
      if (Arithmetic.interpret(val1, state) !== 'register') {
        throw new Error('Destination is not a register');
      }

      if (Arithmetic.interpret(val2, state) !== 'register') {
        throw new Error('Source is not a register');
      }
      const destination = val1;
      if (Arithmetic.interpret(val3, state) === 'register') {
        val3 = state[val3 as RegisterType];
      } else {
        val3 = Arithmetic.interpret(val3, state);
      }
      state[destination as RegisterType] = state[val2 as RegisterType] + val3;
      return state[destination as RegisterType];
    },
    ADDS(
      tokens: string[],
      state: ProgramState,
    ) {
      const result = Arithmetic.execute.ADD(tokens, state);
      state.CPSR = result;
    },
    SUB(
      tokens: string[],
      state: ProgramState,
    ) {
      const val1 = tokens[1];
      const val2 = tokens[2];
      let val3: any = tokens[3];
      if (Arithmetic.interpret(val1, state) !== 'register') {
        throw new Error('Destination is not a register');
      }
      if (Arithmetic.interpret(val2, state) !== 'register') {
        throw new Error('Source is not a register');
      }
      const destination = val1;
      if (Arithmetic.interpret(val3, state) === 'register') {
        val3 = state[val3 as RegisterType];
      } else {
        val3 = Arithmetic.interpret(val3, state);
      }
      state[destination as RegisterType] = state[val2 as RegisterType] - val3;

      return state[destination as RegisterType];
    },
    SUBS(
      tokens: string[],
      state: ProgramState,
    ) {
      const result = Arithmetic.execute.SUB(tokens, state);
      state.CPSR = result;
    },
    MUL(
      tokens: string[],
      state: ProgramState,
    ) {
      const val1 = tokens[1];
      const val2 = tokens[2];
      let val3: any = tokens[3];
      if (Arithmetic.interpret(val1, state) !== 'register') {
        throw new Error('Destination is not a register');
      }
      if (Arithmetic.interpret(val2, state) !== 'register') {
        throw new Error('Source is not a register');
      }
      const destination = val1;
      if (Arithmetic.interpret(val3, state) === 'register') {
        val3 = state[val3 as RegisterType];
      } else {
        val3 = Arithmetic.interpret(val3, state);
      }

      state[destination as RegisterType] = state[val2 as RegisterType] * val3;

      return state[destination as RegisterType];
    },
    MULS(
      tokens: string[],
      state: ProgramState,
    ) {
      const result = Arithmetic.execute.MUL(tokens, state);
      state.CPSR = result;
    },
    MOV(
      tokens: string[],
      state: ProgramState,
    ) {
      const val1 = tokens[1];
      let val2: any = tokens[2];
      if (Arithmetic.interpret(val1, state) !== 'register') {
        throw new Error('Destination is not a register');
      }
      if (Arithmetic.interpret(val2, state) === 'register') {
        val2 = state[val2 as RegisterType];
      } else {
        val2 = Arithmetic.interpret(val2, state);
      }

      state[val1 as RegisterType] = val2;

      return state[val1 as RegisterType];
    },
    MOVS(
      tokens: string[],
      state: ProgramState,
    ) {
      const result = Arithmetic.execute.MOV(tokens, state);
      state.CPSR = result;
    },
    AND(
      tokens: string[],
      state: ProgramState,
    ) {
      const val1 = tokens[1];
      const val2 = tokens[2];
      let val3: any = tokens[3];
      if (Arithmetic.interpret(val1, state) !== 'register') {
        throw new Error('Destination is not a register');
      }
      if (Arithmetic.interpret(val2, state) !== 'register') {
        throw new Error('Source is not a register');
      }
      const destination = val1;
      if (Arithmetic.interpret(val3, state) === 'register') {
        val3 = state[val3 as RegisterType];
      } else {
        val3 = Arithmetic.interpret(val3, state);
      }

      state[destination as RegisterType] = state[val2 as RegisterType] & val3;

      return state[destination as RegisterType];
    },
    ANDS(
      tokens: string[],
      state: ProgramState,
    ) {
      const result = Arithmetic.execute.AND(tokens, state);
      state.CPSR = result;
    },
    ORR(
      tokens: string[],
      state: ProgramState,
    ) {
      const val1 = tokens[1];
      const val2 = tokens[2];
      let val3: any = tokens[3];
      if (Arithmetic.interpret(val1, state) !== 'register') {
        throw new Error('Destination is not a register');
      }
      if (Arithmetic.interpret(val2, state) !== 'register') {
        throw new Error('Source is not a register');
      }
      const destination = val1;
      if (Arithmetic.interpret(val3, state) === 'register') {
        val3 = state[val3 as RegisterType];
      } else {
        val3 = Arithmetic.interpret(val3, state);
      }

      state[destination as RegisterType] = state[val2 as RegisterType] | val3;

      return state[destination as RegisterType];
    },
    ORRS(
      tokens: string[],
      state: ProgramState,
    ) {
      const result = Arithmetic.execute.ORR(tokens, state);
      state.CPSR = result;
    },
    CMP(
      tokens: string[],
      state: ProgramState,
    ) {
      const val1 = tokens[1];
      const val2 = tokens[2];
      let numeric1 = Arithmetic.interpret(val1, state);
      let numeric2 = Arithmetic.interpret(val2, state);
      if (numeric1 === 'register') {
        numeric1 = state[val1 as RegisterType];
      }
      if (numeric2 === 'register') {
        numeric2 = state[val2 as RegisterType];
      }
      state.CPSR = numeric1 as number - (numeric2 as number);
    },
  };
}
