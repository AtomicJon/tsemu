import { FLAGS_NO_CHANGE } from '../constants';
import Cpu from '../Cpu';
import { ResultFlags } from '../types';
import ret from './ret';

/**
 * Return from subroutine if zero flag is not set
 * @param cpu Cpu to operate on
 */
export default function retNz(cpu: Cpu): ResultFlags {
  if (!cpu.flagZ) {
    return ret(cpu);
  }

  return FLAGS_NO_CHANGE;
}
