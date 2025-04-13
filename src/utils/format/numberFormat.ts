export function numberFormat(value: number | string): string {
  if (typeof value === 'string') {
    return Number(value).toLocaleString('ko-KR', { minimumIntegerDigits: 2 });
  }
  return value.toLocaleString('ko-KR', { minimumIntegerDigits: 2 });
}
