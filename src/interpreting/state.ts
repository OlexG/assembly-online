export type RegisterType = 'R0' | 'R1' | 'R2' | 'R3' | 'R4' | 'R5' | 'R6' | 'R7' | 'R8' | 'R9' | 'R10' | 'FP' | 'SP' | 'LR' | 'PC';

export class ProgramState {
  R0: number = 0;

  R1: number = 0;

  R2: number = 0;

  R3: number = 0;

  R4: number = 0;

  R5: number = 0;

  R6: number = 0;

  R7: number = 0;

  R8: number = 0;

  R9: number = 0;

  R10: number = 0;

  FP: number = 0;

  SP: number = 0;

  LR: number = 0;

  PC: number = 0;

  CPSR: number = 0;

  currentLine: number = 0;

  labels: { [key: string]: number } = {};

  pcToLineNumber : {
    [key: number]: number
  } = {};

  error: {
    message: Error | null,
    line: number | null,
    outputed: boolean
  } = {
      message: null,
      line: null,
      outputed: true,
    };

  messages: {
    message: string,
    line: number,
  }[] = [];

  builtInFunctions = {
    print: () => {
      if (this) {
        const newMessage = {
          message: this.R0.toString(),
          line: this.currentLine,
        };
        this.messages.push(newMessage);
      }
    },
  };

  getAllRegisters(): {name: string, value: number}[] {
    return [
      { name: 'R0', value: this.R0 },
      { name: 'R1', value: this.R1 },
      { name: 'R2', value: this.R2 },
      { name: 'R3', value: this.R3 },
      { name: 'R4', value: this.R4 },
      { name: 'R5', value: this.R5 },
      { name: 'R6', value: this.R6 },
      { name: 'R7', value: this.R7 },
      { name: 'R8', value: this.R8 },
      { name: 'R9', value: this.R9 },
      { name: 'R10', value: this.R10 },
      { name: 'FP', value: this.FP },
      { name: 'SP', value: this.SP },
      { name: 'LR', value: this.LR },
      { name: 'PC', value: this.PC },
    ];
  }

  isRegister(token: string): boolean {
    return this.getAllRegisters().map((r) => r.name).includes(token);
  }
}
