export default function getBinaryString(value: number): string {
  const hex = value.toString(2);
  return `${'0'.repeat(8 - hex.length)}${hex}b`;
}
