import { promises as fs } from 'fs';
import path from 'path';
import { ImageResponse } from 'next/og';
import { NextRequest, NextResponse } from 'next/server';
import { getImage, getPost } from '@/lib/getPosts';
import { getImageMimeType } from '@/lib/mime-getter';

export const revalidate = 60 * 20;

export async function GET(req: NextRequest, context: { params: { slug: string[] } }) {
  const slug = decodeURIComponent(context.params.slug.join('/'));
  const { data } = await getPost(`${process.env.GIT_POSTS_DIR!}/${slug}.md`);
  const font = await fs.readFile(path.join(process.cwd(), 'assets', 'NotoSansJP-ExtraBold-Sub.ttf'));
  const base64Image = data.thumbnail ? await getImage(data.thumbnail) : '';

  if ((data.thumbnail && base64Image === '') || !data.thumbnail)
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            color: '#222',
            backgroundImage: `url(${process.env.NEXT_PUBLIC_URL}/ogp_back.png)`,
            justifyContent: 'center',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            fontSize: '50px',
            fontFamily: 'NotoSansJP',
          }}
        >
          <div
            style={{
              width: '70%',
              lineHeight: '1.2',
              fontWeight: 'bold',
            }}
          >
            {data.title}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        status: 200,
        fonts: [
          {
            name: 'NotoSansJP',
            data: font,
            style: 'normal',
          },
        ],
      },
    );
  else {
    const mimeType = getImageMimeType(data.thumbnail);
    const imageBuffer = Buffer.from(base64Image, 'base64');

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': mimeType,
        'Content-Length': imageBuffer.length.toString(),
      },
    });
  }
}
