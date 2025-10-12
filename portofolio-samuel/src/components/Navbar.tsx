// /src/components/Navbar.tsx
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Github, Linkedin, X as XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { AnimatedGridIcon } from './AnimatedGridIcon';
// Removed project teaser for a cleaner, focused menu overlay

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedMenuLink, setSelectedMenuLink] = useState('');
  const pathname = usePathname();

  // ... (useEffect tetap sama)
  useEffect(() => {
    const handleScroll = () => { setScrolled(window.scrollY > 10); };
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  type NavLink = { href: string; label: string; desc?: string };
  const navLinks: NavLink[] = [
    { href: '/#home', label: 'Home', desc: 'Kembali ke bagian atas' },
    { href: '/about', label: 'About', desc: 'About me (EN)' },
    { href: '/projects', label: 'Projects', desc: 'Koleksi proyek yang saya buat' },
    { href: '/profile', label: 'Profile', desc: 'Profil pribadi & perjalanan' },
    { href: '/contact', label: 'Kontak', desc: 'Mari berdiskusi lebih lanjut' },
  ];
  
  const menuVariants = {
    initial: { scaleY: 0, opacity: 0 },
    animate: {
      scaleY: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
    exit: { scaleY: 0, opacity: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  };
  const linkVariants = {
    initial: { y: 24, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.45, ease: [0.33, 1, 0.68, 1] } },
  };

  return (
    <>
      <header className={cn(
        'fixed inset-x-0 top-0 z-30 transition-all',
        scrolled ? 'backdrop-blur bg-white/70 border-b border-black/10' : 'bg-transparent'
      )}>
        <div className="container mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
          <Link
            href="/"
            className="group relative inline-block text-xl md:text-2xl font-bold tracking-tight leading-none text-black drop-shadow-[0_1px_1px_rgba(255,255,255,0.25)]"
          >
            Hi, I&apos;m Samuel
            <span
              className="absolute left-0 -bottom-1 h-0.5 w-1/3 rounded-full bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary opacity-90 transition-all duration-500 ease-out group-hover:w-full group-hover:opacity-100"
              aria-hidden
            />
          </Link>

          {/* NAVIGASI DESKTOP TRADISIONAL DIHAPUS */}
          
          <div className="flex items-center gap-4">
            {/* Tampilkan social links di semua ukuran layar */}
            <Link href="https://github.com/devwebxyn" target="_blank"><Github size={20} className="text-text-body hover:text-text-heading transition-colors" /></Link>
            <Link href="https://www.linkedin.com/in/samuel-indra-bastian/" target="_blank"><Linkedin size={20} className="text-text-body hover:text-text-heading transition-colors" /></Link>
            
            {/* Ikon grid kita sekarang menjadi navigasi utama */}
            <div className="ml-4">
              <AnimatedGridIcon isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            // Professional overlay: subtle grid + blur + tint
            className="fixed inset-0 z-40 origin-top animated-grid-background bg-background-dark/60 backdrop-blur-md"
          >
            <div className="container mx-auto relative flex h-full max-w-5xl flex-col items-center justify-center px-4">
              {/* Close button */}
              <button
                aria-label="Tutup menu"
                onClick={() => setIsOpen(false)}
                className="absolute right-4 top-4 rounded-full border border-white/20 bg-white/10 p-2 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-accent-primary/60"
              >
                <XIcon size={18} />
              </button>
              {/* Animated backdrop blob responding to selection */}
              <AnimatePresence mode="wait">
                {selectedMenuLink && (
                  <motion.div
                    key={selectedMenuLink}
                    className={cn(
                      "animated-section-blob",
                      selectedMenuLink === '/#home' && 'blob-projects',
                      selectedMenuLink === '/about' && 'blob-about',
                      selectedMenuLink === '/contact' && 'blob-contact',
                      selectedMenuLink === '/profile' && 'blob-about'
                    )}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 0.18, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                )}
              </AnimatePresence>
              <motion.nav
                className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl"
                variants={{ animate: { transition: { staggerChildren: 0.08 } } }}
                initial="initial"
                animate="animate"
              >
                {navLinks.map((link) => (
                  <motion.div
                    key={`${link.label}-${link.href}`}
                    variants={linkVariants}
                    onMouseEnter={() => setSelectedMenuLink(link.href)}
                    onMouseLeave={() => setSelectedMenuLink('')}
                  >
                    <Link
                      href={link.href}
                      onMouseMove={(e) => {
                        const rect = (e.currentTarget as HTMLAnchorElement).getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        (e.currentTarget as HTMLAnchorElement).style.setProperty('--x', `${x}px`);
                        (e.currentTarget as HTMLAnchorElement).style.setProperty('--y', `${y}px`);
                      }}
                      onClick={() => {
                        setSelectedMenuLink(link.href);
                        setIsOpen(false);
                      }}
                      className={`group relative block overflow-hidden rounded-2xl border border-border-subtle bg-background-subtle/70 p-6 backdrop-blur-sm transition-all hover:border-accent-primary/50 hover:shadow-lg hover:shadow-accent-primary/10 ${(selectedMenuLink === '/contact' && link.href === '/contact') || (pathname === link.href) ? 'ring-2 ring-accent-primary/60' : ''}`}
                    >
                      <div className="relative z-10 flex items-start justify-between">
                        <div>
                          <h3 className="text-2xl font-bold text-text-heading group-hover:text-white transition-colors">{link.label}</h3>
                          {link.desc && (
                            <p className="mt-2 text-sm text-text-body">{link.desc}</p>
                          )}
                        </div>
                        <motion.span
                          aria-hidden
                          className="h-8 w-8 rounded-full bg-accent-primary/20 group-hover:bg-accent-primary/40 transition-colors"
                          whileHover={{ scale: 1.05 }}
                        />
                      </div>
                      <motion.div
                        aria-hidden
                        className="absolute inset-0 -z-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{
                          background:
                            'radial-gradient(200px circle at var(--x,50%) var(--y,50%), rgba(0,169,255,0.18), transparent 40%)',
                        }}
                      />
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};