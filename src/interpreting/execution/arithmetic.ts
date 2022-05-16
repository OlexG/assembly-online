import { ProgramState } from "../state"

export class Arithmetic {
  static interpret (token: string, state: ProgramState) {
    if (state.isRegister(token)) {
      return 'register';
    }
    try {
      const value = token.split('#')[1];
      if (value.includes('<<')) {
        const [num, shift] = value.split('<<');
        const numValue = parseInt(num.trim());
        const shiftValue = parseInt(shift.trim());
        return numValue << shiftValue;
      } else if (value.includes('>>')) {
        const [num, shift] = value.split('>>');
        const numValue = parseInt(num.trim());
        const shiftValue = parseInt(shift.trim());
        return numValue >> shiftValue;
      } else {
        return parseInt(value.trim());
      }
    } catch {
      throw new Error(`Could not parse ${token}`);
    }
  }

  static execute = {
    'ADD': function (
      tokens: string[],
      state: ProgramState
    ) {
      let [operation, val1, val2, val3]: any[] = tokens;
      if (Arithmetic.interpret(val1, state) !== 'register') {
        throw new Error('Destination is not a register');
      }

      if (Arithmetic.interpret(val2, state) !== 'register') {
        throw new Error('Source is not a register');
      }
      const destination = val1;
      if (Arithmetic.interpret(val3, state) === 'register') {
        // @ts-ignore
        val3 = state[val3];
      } else {
        val3 = Arithmetic.interpret(val3, state);
      }
      // @ts-ignore
      state[destination] = state[val2] + val3;
    },
    'SUB': function (
      tokens: string[],
      state: ProgramState
    ) {
      let [operation, val1, val2, val3]: any[] = tokens;
      if (Arithmetic.interpret(val1, state) !== 'register') {
        throw new Error('Destination is not a register');
      }
      if (Arithmetic.interpret(val2, state) !== 'register') {
        throw new Error('Source is not a register');
      }
      const destination = val1;
      if (Arithmetic.interpret(val3, state) === 'register') {
        // @ts-ignore
        val3 = state[val3];
      } else {
        val3 = Arithmetic.interpret(val3, state);
      }
      // @ts-ignore
      state[destination] = state[val2] - val3;
    },
    'MUL': function (
      tokens: string[],
      state: ProgramState
    ) {
      let [operation, val1, val2, val3]: any[] = tokens;
      if (Arithmetic.interpret(val1, state) !== 'register') {
        throw new Error('Destination is not a register');
      }
      if (Arithmetic.interpret(val2, state) !== 'register') {
        throw new Error('Source is not a register');
      }
      const destination = val1;
      if (Arithmetic.interpret(val3, state) === 'register') {
        // @ts-ignore
        val3 = state[val3];
      } else {
        val3 = Arithmetic.interpret(val3, state);
      }
      // @ts-ignore
      state[destination] = state[val2] * val3;
    },
    'MOV': function (
      tokens: string[],
      state: ProgramState
    ) {
      let [operation, val1, val2]: any[] = tokens;
      if (Arithmetic.interpret(val1, state) !== 'register') {
        throw new Error('Destination is not a register');
      }
      if (Arithmetic.interpret(val2, state) === 'register') {
        // @ts-ignore
        val2 = state[val2];
      } else {
        val2 = Arithmetic.interpret(val2, state);
      }
      // @ts-ignore
      state[val1] = val2;
    },
    'AND': function (
      tokens: string[],
      state: ProgramState
    ) {
      let [operation, val1, val2, val3]: any[] = tokens;
      if (Arithmetic.interpret(val1, state) !== 'register') {
        throw new Error('Destination is not a register');
      }
      if (Arithmetic.interpret(val2, state) !== 'register') {
        throw new Error('Source is not a register');
      }
      const destination = val1;
      if (Arithmetic.interpret(val3, state) === 'register') {
        // @ts-ignore
        val3 = state[val3];
      } else {
        val3 = Arithmetic.interpret(val3, state);
      }
      // @ts-ignore
      state[destination] = state[val2] & val3;
    },
    'ORR': function (
      tokens: string[],
      state: ProgramState
    ) {
      let [operation, val1, val2, val3]: any[] = tokens;
      if (Arithmetic.interpret(val1, state) !== 'register') {
        throw new Error('Destination is not a register');
      }
      if (Arithmetic.interpret(val2, state) !== 'register') {
        throw new Error('Source is not a register');
      }
      const destination = val1;
      if (Arithmetic.interpret(val3, state) === 'register') {
        // @ts-ignore
        val3 = state[val3];
      } else {
        val3 = Arithmetic.interpret(val3, state);
      }
      // @ts-ignore
      state[destination] = state[val2] | val3;
    }
  }

}