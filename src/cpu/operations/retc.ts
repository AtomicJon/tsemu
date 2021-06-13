import { FLAGS_NO_CHANGE } from '../constants';
import Cpu from '../Cpu';
import { ResultFlags } from '../types';
import ret from './ret';

/**
 * Return from subroutine if carry flag is set
 * @param cpu Cpu to operate on
 */
export default function retC(cpu: Cpu): ResultFlags {
  if (cpu.flagC) {
    return ret(cpu);
  }

  return FLAGS_NO_CHANGE;
}
