'use server';

import { incrementBlogViews } from '@/lib/blog-views';

export async function incrementView(blogId: string) {
  return incrementBlogViews(blogId);
}
