import Cpu from '../Cpu';
import { ResultFlags } from '../types';

export default function daa(cpu: Cpu): ResultFlags {
  let result = cpu.A;
  let flagC: boolean | null = null;

  // Addition - flagN = if previous op was subtraction
  if (!cpu.flagN) {
    if (cpu.flagH || (cpu.A & 0x0f) > 0x09) {
      result += 0x06;
    }

    if (cpu.flagC || cpu.A > 0x99) {
      result += 0x60;
      flagC = true;
    }
  } else if (cpu.flagH) {
    // Subtraction
    if (cpu.flagH) {
      result -= 0x06;
    }

    if (cpu.flagC) {
      result -= 0x60;
    }
  }

  const maskedResult = result & 0xff;
  cpu.A = maskedResult;

  return {
    Z: maskedResult === 0,
    N: null,
    H: false,
    C: flagC,
  };
}
