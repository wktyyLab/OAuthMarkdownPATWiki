export function makeExcerpt(text: string, maxLength: number) {
  return text?.length ? (text.length >= maxLength ? text.slice(0, maxLength) + '...' : text) : text;
}
