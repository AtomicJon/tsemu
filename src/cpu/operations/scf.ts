import { ResultFlags } from '../types';

/**
 * Set the carry flag
 */
export default function scf(): ResultFlags {
  return {
    Z: null,
    N: false,
    H: false,
    C: true,
  };
}
