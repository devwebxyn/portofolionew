// /src/components/Footer.tsx
import Link from 'next/link';
import { Github, Linkedin } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border-subtle">
      <div className="container mx-auto flex h-20 max-w-5xl items-center justify-between px-4 text-sm text-text-body">
        
        {/* Copyright */}
        <div>
          © {currentYear} Samuel Indra Bastian. All rights reserved.
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4">
          <Link href="https://github.com/devwebxyn" target="_blank" rel="noopener noreferrer">
            <Github className="h-5 w-5 hover:text-text-heading transition-colors" />
          </Link>
          <Link href="https://www.linkedin.com/in/samuel-indra-bastian/" target="_blank" rel="noopener noreferrer">
            <Linkedin className="h-5 w-5 hover:text-text-heading transition-colors" />
          </Link>
        </div>
      </div>
    </footer>
  );
};