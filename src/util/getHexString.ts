/**
 * Get the hex representation of a number, padded to the specified width
 * @param value The value to get the hex representation of
 * @param width How many digits to pad the result to
 */
export default function getHexString(value: number, width: number = 2): string {
  const hex = value.toString(16);
  if (hex.length < width) {
    return `${'0'.repeat(width - hex.length)}${hex}`;
  } else {
    return `${hex}`;
  }
}
