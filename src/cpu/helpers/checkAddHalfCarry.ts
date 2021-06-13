/**
 * Check if there is a half carry adding values
 * @param value1 The first value being added
 * @param value2 The second value being added
 * @param plusOne Whether 1 should be added to the result (carry result)
 */
export function checkAddHalfCarry(
  value1: number,
  value2: number,
  plusOne: boolean = false,
) {
  return (
    (((value1 & 0x0f) + (value2 & 0x0f) + (plusOne ? 1 : 0)) & 0x10) === 0x10
  );
}
