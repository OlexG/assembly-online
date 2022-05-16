import { ProgramState } from "../state";

export class Labels {
  static isLabel(line: string, state: ProgramState): boolean {
    if (line.includes(":")) {
      if (Object.keys(state.labels).includes(line.split(":")[0])) {
        return false; // label but already exists
      }
      return true; // label
    }
    return false; // not a label
  }
}