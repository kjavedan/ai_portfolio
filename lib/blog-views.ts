import fs from 'fs';
import path from 'path';

const VIEWS_FILE_PATH = path.join(process.cwd(), 'data', 'blog-views.json');

export function getBlogViews(blogId: string): number {
  try {
    const viewsData = JSON.parse(fs.readFileSync(VIEWS_FILE_PATH, 'utf-8'));
    return viewsData[blogId] || 0;
  } catch (error) {
    console.error('Error reading blog views:', error);
    return 0;
  }
}

export function incrementBlogViews(blogId: string): number {
  try {
    const viewsData = JSON.parse(fs.readFileSync(VIEWS_FILE_PATH, 'utf8'));
    viewsData[blogId] = (viewsData[blogId] || 0) + 1;
    fs.writeFileSync(VIEWS_FILE_PATH, JSON.stringify(viewsData, null, 2));
    return viewsData[blogId];
  } catch (error) {
    console.error('Error incrementing blog views:', error);
    return 0;
  }
}
