import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import { Markdown } from '@/components/markdown';
import { incrementView } from '@/app/actions/blog-views';

interface BlogPageProps {
  params: Promise<{
    blogId: string;
  }>;
}

export default async function Blog({ params }: BlogPageProps) {
  const { blogId } = await params;

  // Construct the path to the markdown file
  const filePath = path.join(process.cwd(), 'assets', 'blogs', `${blogId}.md`);

  try {
    // Read the markdown file
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // Parse the frontmatter and content
    const { content } = matter(fileContent);

    // Increment view count and get current views
    const views = await incrementView(blogId);

    return (
      <article className="prose-gray prose-lg prose-h1:font-bold prose-h2:font-bold prose-h3:font-bold prose-a:underline prose-ul:list-disc prose-ol:list-decimal prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-700 dark:prose-blockquote:border-gray-700 dark:prose-blockquote:text-gray-300 size-full overflow-y-scroll px-4 pt-6 pb-20 lg:pl-0">
        <div className="text-muted-foreground mb-4 text-sm">{views} views</div>
        <Markdown>{content}</Markdown>
      </article>
    );
  } catch (error) {
    console.log('🚀 ~ Blog ~ error:', error);
    // If the file doesn't exist, return 404
    notFound();
  }
}
