export default function getHexString(value: number): string {
  const hex = value.toString(16);
  return `0x${'0'.repeat(2 - hex.length)}${hex}`;
}
