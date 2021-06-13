/**
 * Check if there is a half carry subtracting values
 * @param value1 The value being subtracted from
 * @param value2 The value being subtracted
 * @param plusOne Whether 1 should be subtracted from the result (carry result)
 */
export function checkSubtractHalfCarry(
  value1: number,
  value2: number,
  minusOne: boolean = false,
) {
  return (
    (((value1 & 0x0f) - (value2 & 0x0f) - (minusOne ? 1 : 0)) & 0x10) === 0x10
  );
}
