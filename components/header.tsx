'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

import { Button } from './ui/button';
import { ModeToggle } from './mode-toggle';

const navItems = [
  { href: '/', label: 'Me' },
  { href: '/about', label: 'Ai' },
  { href: '/game', label: 'Game' },
  { href: '/blogs', label: 'blogs' },
];

export default function Header() {
  const pathname = usePathname();

  const [isMenu, setIsMenu] = useState(true);

  const navVariants = {
    visible: {
      height: 80,
      transition: {
        duration: 0.2,
        staggerChildren: 0.1,
      },
    },
    hidden: {
      height: 0,
      transition: {
        height: { delay: 0.3, duration: 0.3 },
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.2,
      },
    },
    hidden: {
      opacity: 0,
      x: 100,
      transition: {
        duration: 0.1,
      },
    },
  };

  return (
    <header className="p-4 py-2 font-mono md:py-4 xl:px-0">
      <div className="flex items-center justify-between">
        <Link href={'/'} className="font-extrabold">
          <h1 className="w-fit">Khaled Javdan</h1>
        </Link>
        <div className="flex items-center">
          <ModeToggle />

          <Button
            variant={'link'}
            size={'icon'}
            onClick={() => setIsMenu(!isMenu)}
          >
            {isMenu ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      <nav>
        <AnimatePresence>
          {isMenu && (
            <motion.ul
              className="text-muted-foreground/70 flex items-center gap-6"
              variants={navVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {navItems.map((item) => (
                <motion.li key={item.href} variants={itemVariants}>
                  <Link
                    href={item.href}
                    className={cn(
                      'hover:underline',
                      pathname && pathname === item.href && 'text-primary',
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
