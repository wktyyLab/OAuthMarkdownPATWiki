import { JSDOM } from 'jsdom';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const targetURL = new URL(req.url).searchParams.get('url');
  if (!targetURL) return Response.json({ message: 'Fatal Error: no "url" query' }, { status: 400 });

  try {
    const html = await fetch(targetURL).then((res) => res.text());
    const dom = new JSDOM(html);
    const metaTags = dom.window.document.querySelectorAll('meta');

    const metaData: Record<string, string> = {};

    metaTags.forEach((meta: HTMLMetaElement) => {
      const property = meta.getAttribute('property');
      if (property && property.startsWith('og:')) {
        metaData[property] = meta.getAttribute('content') || '';
      }
      const name = meta.getAttribute('name');
      if (name && name === 'description') {
        metaData['description'] = meta.getAttribute('content') || '';
      }
    });

    const titleElement = dom.window.document.querySelector('title');
    if (titleElement) {
      metaData['title'] = titleElement.textContent || '';
    }

    metaData['url'] = targetURL;

    return Response.json({ meta: metaData }, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: 'Error fetching or parsing the URL', error },
      {
        status: 500,
      },
    );
  }
}
