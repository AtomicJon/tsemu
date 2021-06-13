import { FLAGS_NO_CHANGE } from '../constants';
import Cpu from '../Cpu';
import { ResultFlags } from '../types';
import ei from './ei';
import ret from './ret';

/**
 * Return and enable interrupts
 * @param cpu Cpu to operate on
 */
export default function reti(cpu: Cpu): ResultFlags {
  ret(cpu);
  ei(cpu);

  return FLAGS_NO_CHANGE;
}
