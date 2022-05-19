import { ProgramState, RegisterType } from "../state"

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
        
        val3 = state[val3 as RegisterType];
      } else {
        val3 = Arithmetic.interpret(val3, state);
      }
      state[destination as RegisterType] = state[val2 as RegisterType] + val3;
      return state[destination as RegisterType];
    },
    'ADDS': function (
      tokens: string[],
      state: ProgramState
    ) {
      const result = Arithmetic.execute['ADD'](tokens, state);
      state.CPSR = result; 
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
        val3 = state[val3 as RegisterType];
      } else {
        val3 = Arithmetic.interpret(val3, state);
      }
      state[destination as RegisterType] = state[val2 as RegisterType] - val3;
      
      return state[destination as RegisterType];
    },
    'SUBS': function (
      tokens: string[],
      state: ProgramState
    ) {
      const result = Arithmetic.execute['SUB'](tokens, state);
      state.CPSR = result; 
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
        
        val3 = state[val3 as RegisterType];
      } else {
        val3 = Arithmetic.interpret(val3, state);
      }
      
      state[destination as RegisterType] = state[val2 as RegisterType] * val3;
      
      return state[destination as RegisterType];
    },
    'MULS': function (
      tokens: string[],
      state: ProgramState
    ) {
      const result = Arithmetic.execute['MUL'](tokens, state);
      state.CPSR = result; 
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
        
        val2 = state[val2 as RegisterType];
      } else {
        val2 = Arithmetic.interpret(val2, state);
      }
      
      state[val1 as RegisterType] = val2;
      
      return state[val1 as RegisterType];
    },
    'MOVS': function (
      tokens: string[],
      state: ProgramState
    ) {
      const result = Arithmetic.execute['MOV'](tokens, state);
      state.CPSR = result; 
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
        
        val3 = state[val3 as RegisterType];
      } else {
        val3 = Arithmetic.interpret(val3, state);
      }
      
      state[destination as RegisterType] = state[val2 as RegisterType] & val3;
      
      return state[destination as RegisterType];
    },
    'ANDS': function (
      tokens: string[],
      state: ProgramState
    ) {
      const result = Arithmetic.execute['AND'](tokens, state);
      state.CPSR = result; 
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
        
        val3 = state[val3 as RegisterType];
      } else {
        val3 = Arithmetic.interpret(val3, state);
      }
      
      state[destination as RegisterType] = state[val2 as RegisterType] | val3;
      
      return state[destination as RegisterType];
    },
    'ORRS': function (
      tokens: string[],
      state: ProgramState
    ) {
      const result = Arithmetic.execute['ORR'](tokens, state);
      state.CPSR = result; 
    },
    'CMP': function (
      tokens: string[],
      state: ProgramState
    ) {
      let [operation, val1, val2]: any[] = tokens;
      let numeric1 = Arithmetic.interpret(val1, state);
      let numeric2 = Arithmetic.interpret(val2, state);
      if (numeric1 === 'register') {
        numeric1 = state[val1 as RegisterType];
      }
      if (numeric2 === 'register') {
        numeric2 = state[val2 as RegisterType];
      }
      state.CPSR = numeric1 as number - (numeric2 as number);
    }
  }

}