import { NextRequest, NextResponse } from 'next/server';
import { getCommentList } from '@/lib/commentIssueManager';

export async function GET(req: NextRequest, context: { params: { slug: string[] } }) {
  const slug = decodeURIComponent(context.params.slug.join('/'));

  try {
    const issueData = await getCommentList(slug);

    return NextResponse.json(issueData);
  } catch (error) {
    console.error(`Error fetching comments for slug: ${slug}`, error);
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}
