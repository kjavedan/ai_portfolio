import Link from 'next/link';
import { getBlogs } from '@/app/actions/blogs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default async function Blogs() {
  const blogs = await getBlogs();

  return (
    <div className="px-4 lg:px-0">
      <Table>
        <TableHeader>
          <TableRow className="text-xs">
            <TableHead className="text-muted-foreground w-[100px]">
              Date
            </TableHead>
            <TableHead className="text-muted-foreground">Title</TableHead>
            <TableHead className="text-muted-foreground text-right">
              Views
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogs.map((blog) => (
            <TableRow
              key={blog.id}
              className="hover:bg-muted/50 cursor-pointer"
            >
              <TableCell className="text-muted-foreground">
                <Link href={blog.path} className="block">
                  {blog.date}
                </Link>
              </TableCell>
              <TableCell>
                <Link href={blog.path} className="block">
                  {blog.title}
                </Link>
              </TableCell>
              <TableCell className="text-right">
                <Link href={blog.path} className="block">
                  {blog.views}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
