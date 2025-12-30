import markdownToTxt from 'markdown-to-txt';

export async function MarkdownToPlainText(content: string) {
  return markdownToTxt(content)
    .replaceAll(/<\/?[^>]+(>|$)/g, '')
    .replace(/\r\n/g, ' ')
    .replace(/\r/g, ' ')
    .replace(/\n/g, ' ');
}

export function GetImagesFromMarkdown(content: string) {
  const imagePaths: string[] = [];
  const regex = /!\[.*?\]\((.*?)\)/g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    imagePaths.push(match[1]);
  }

  return imagePaths;
}
