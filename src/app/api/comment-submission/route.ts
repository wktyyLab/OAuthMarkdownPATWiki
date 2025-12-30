import { LRUCache } from 'lru-cache';
import { NextRequest, NextResponse } from 'next/server';
import { fetchAllData } from '@/lib/fetchingFunc';

const rateLimit = new LRUCache<string, number>({
  max: 1000,
  ttl: 1000 * 60 * 60,
});

const getHeaders = () => {
  return {
    Authorization: `token ${process.env.GIT_TOKEN!}`,
    'Content-Type': 'application/json',
  };
};

const authorize = async (token: string) => {
  const secretKey = `secret=${process.env.RECAPTCHA_SECRET_KEY!}&response=${token}`;
  const data = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: secretKey,
  }).then((res) => res.json());

  return data;
};

export async function POST(req: NextRequest) {
  const { slug, comment, token } = await req.json();
  const ip = req.ip || req.headers.get('x-forwarded-for') || 'unknown';

  if (!slug || !comment || !token) {
    return NextResponse.json({ error: 'Missing slug or comment body' }, { status: 400 });
  }

  const requestCount = rateLimit.get(ip) || 0;
  if (requestCount > 10) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }
  rateLimit.set(ip, requestCount + 1);

  const recaptchaJson = await authorize(token);

  if (!recaptchaJson.success) {
    return NextResponse.json({ error: 'ReCAPTCHA verification failed' }, { status: 401 });
  }

  try {
    const issues = await fetchAllData(
      `https://api.github.com/repos/${process.env.GIT_USERNAME!}/${process.env.GIT_REPO!}/issues`,
      5,
    );
    const issue = issues.find((issue: any) => issue.title === slug);

    if (!issue) {
      return NextResponse.json({ error: `Issue with slug "${slug}" not found` }, { status: 404 });
    }

    // コメントの追加
    const commentsURL = issue.comments_url;
    const data = {
      body: comment,
    };

    const response = await fetch(commentsURL, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return NextResponse.json({ message: 'Comment added successfully' }, { status: 200 });
    } else {
      const errorText = await response.text();
      return NextResponse.json({ error: `Failed to add comment: ${errorText}` }, { status: response.status });
    }
  } catch (e) {
    console.error('Error adding comment:', e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
