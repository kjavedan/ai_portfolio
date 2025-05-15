import { redis } from './redis';

export async function getBlogViews(blogId: string): Promise<number> {
  try {
    const views = await redis.get<number>(`blog:${blogId}:views`);
    return views || 0;
  } catch (error) {
    console.error('Error reading blog views:', error);
    return 0;
  }
}

export async function incrementBlogViews(blogId: string): Promise<number> {
  try {
    const views = await redis.incr(`blog:${blogId}:views`);
    return views;
  } catch (error) {
    console.error('Error incrementing blog views:', error);
    return 0;
  }
}
