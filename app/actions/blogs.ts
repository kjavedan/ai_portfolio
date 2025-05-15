'use server';

import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';
import { getBlogViews } from '@/lib/blog-views';

import type { Blog } from '@/types/blog';

export async function getBlogs(): Promise<Blog[]> {
  const blogsDirectory = path.join(process.cwd(), 'assets', 'blogs');
  const files = fs.readdirSync(blogsDirectory);

  const blogs = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(blogsDirectory, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);
      const blogId = file.replace('.md', '');

      return {
        id: blogId,
        path: `/blogs/${blogId}`,
        title: data.title || 'Untitled',
        date: data.date || '2024',
        views: await getBlogViews(blogId),
      };
    }),
  );

  // Sort blogs by date in descending order
  return blogs.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}
