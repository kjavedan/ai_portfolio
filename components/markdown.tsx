import Link from 'next/link';
import remarkGfm from 'remark-gfm';
import React, { memo } from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';

import { CodeBlock } from './code-block';

const components: Partial<Components> = {
  // @ts-expect-error - CodeBlock component has different props than expected by react-markdown
  code: CodeBlock,
  pre: ({ children }) => <>{children}</>,
  table: ({ children, ...props }) => {
    return (
      <div className="my-6 overflow-x-auto">
        <table
          className="w-full border-collapse border border-gray-300 dark:border-zinc-900"
          {...props}
        >
          {children}
        </table>
      </div>
    );
  },
  thead: ({ children, ...props }) => {
    return (
      <thead className="bg-gray-50 dark:bg-zinc-800" {...props}>
        {children}
      </thead>
    );
  },
  tbody: ({ children, ...props }) => {
    return (
      <tbody
        className="divide-y divide-gray-200 dark:divide-zinc-700"
        {...props}
      >
        {children}
      </tbody>
    );
  },
  tr: ({ children, ...props }) => {
    return (
      <tr className="hover:bg-gray-50 dark:hover:bg-zinc-800" {...props}>
        {children}
      </tr>
    );
  },
  th: ({ children, ...props }) => {
    return (
      <th
        className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-900 dark:border-gray-600 dark:text-gray-100"
        {...props}
      >
        {children}
      </th>
    );
  },
  td: ({ children, ...props }) => {
    return (
      <td
        className="border border-gray-300 px-4 py-2 text-gray-900 dark:border-zinc-600 dark:text-gray-100"
        {...props}
      >
        {children}
      </td>
    );
  },
  ol: ({ children, ...props }) => {
    return (
      <ol className="ml-4 list-outside list-decimal" {...props}>
        {children}
      </ol>
    );
  },
  li: ({ children, ...props }) => {
    return (
      <li className="py-1" {...props}>
        {children}
      </li>
    );
  },
  ul: ({ children, ...props }) => {
    return (
      <ul className="ml-4 list-outside list-decimal" {...props}>
        {children}
      </ul>
    );
  },
  strong: ({ children, ...props }) => {
    return (
      <span className="font-semibold" {...props}>
        {children}
      </span>
    );
  },
  a: ({ children, ...props }) => {
    return (
      // @ts-expect-error - Link component from Next.js has different props than expected by react-markdown
      <Link
        className="text-blue-500 hover:underline"
        target="_blank"
        rel="noreferrer"
        {...props}
      >
        {children}
      </Link>
    );
  },
  h1: ({ children, ...props }) => {
    return (
      <h1 className="mt-6 mb-2 text-3xl font-semibold" {...props}>
        {children}
      </h1>
    );
  },
  h2: ({ children, ...props }) => {
    return (
      <h2 className="mt-6 mb-2 text-2xl font-semibold" {...props}>
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }) => {
    return (
      <h3 className="mt-6 mb-2 text-xl font-semibold" {...props}>
        {children}
      </h3>
    );
  },
  h4: ({ children, ...props }) => {
    return (
      <h4 className="mt-6 mb-2 text-lg font-semibold" {...props}>
        {children}
      </h4>
    );
  },
  h5: ({ children, ...props }) => {
    return (
      <h5 className="mt-6 mb-2 text-base font-semibold" {...props}>
        {children}
      </h5>
    );
  },
  h6: ({ children, ...props }) => {
    return (
      <h6 className="mt-6 mb-2 text-sm font-semibold" {...props}>
        {children}
      </h6>
    );
  },
};

const remarkPlugins = [remarkGfm];

const NonMemoizedMarkdown = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown remarkPlugins={remarkPlugins} components={components}>
      {children}
    </ReactMarkdown>
  );
};

export const Markdown = memo(
  NonMemoizedMarkdown,
  (prevProps, nextProps) => prevProps.children === nextProps.children,
);
