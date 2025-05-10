'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

import { ModeToggle } from './mode-toggle';

const navItems = [
  { href: '/', label: 'Ai Assistant' },
  { href: '/game', label: 'Game' },
  { href: '/about', label: 'about' },
  { href: '/blogs', label: 'blogs' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="p-4 font-mono xl:px-0">
      <div className="flex items-center justify-between">
        <Link href={'/'} className="font-extrabold">
          <h1 className="w-fit">Khaled Javdan</h1>
        </Link>
        <ModeToggle />
      </div>
      <nav className="mt-6">
        <ul className="text-muted-foreground/70 flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'hover:underline',
                pathname === item.href && 'text-primary',
              )}
            >
              {item.label}
            </Link>
          ))}
        </ul>
      </nav>
    </header>
  );
}
