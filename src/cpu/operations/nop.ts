import { FLAGS_NO_CHANGE } from '../constants';
import { ResultFlags } from '../types';

/**
 * No op function
 */
export default function nop(): ResultFlags {
  return FLAGS_NO_CHANGE;
}
