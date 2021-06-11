/**
 * Get a 8bit padded binary string for a given number
 * @param value The number to get the binary string for
 */
export default function getBinaryString(value: number): string {
  const hex = value.toString(2);
  return `${'0'.repeat(8 - hex.length)}${hex}b`;
}
