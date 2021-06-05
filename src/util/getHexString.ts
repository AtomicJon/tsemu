export default function getHexString(value: number, width: number = 2): string {
  const hex = value.toString(16);
  if (hex.length < width) {
    return `${'0'.repeat(width - hex.length)}${hex}`;
  } else {
    return `${hex}`;
  }
}
