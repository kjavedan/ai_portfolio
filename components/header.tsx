'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useMenu } from '@/context/menu-context';
import { AnimatePresence, motion } from 'framer-motion';

import { ModeToggle } from './mode-toggle';

const navItems = [
  { href: '/', label: 'Me' },
  { href: '/about', label: 'Ai' },
  { href: '/game', label: 'Game' },
  { href: '/blogs', label: 'blogs' },
];

export default function Header() {
  const pathname = usePathname();

  const { isMenuOpen, setIsMenuOpen } = useMenu();

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
    <header className="p-4 font-mono md:py-4 lg:px-0">
      <div className="flex items-center justify-between">
        <Link href={'/'} className="font-extrabold">
          <h1 className="w-fit">Khaled Javdan</h1>
        </Link>
        <div className="flex items-center gap-3">
          <ModeToggle />

          {isMenuOpen ? (
            <X size={20} onClick={() => setIsMenuOpen(false)} />
          ) : (
            <Menu size={20} onClick={() => setIsMenuOpen(true)} />
          )}
        </div>
      </div>
      <nav>
        <AnimatePresence>
          {isMenuOpen && (
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
