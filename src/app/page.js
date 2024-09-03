import Image from 'next/image';
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import HeroSection from '@/components/HeroSection'
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import About from '@/components/About';
import Contact from '@/components/Contact';

// import { CodeIcon } from 'lucide-react';

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="flex-1 flex items-center">
            <Link href="#" className="flex items-center justify-center pl-4" prefetch={false}>
              <CodeIcon className="h-6 w-6" />
              <span className="sr-only">Leo Joseph&apos;s Portfolio</span>
            </Link>
          </div>
          <nav className="flex items-center space-x-6 text-sm font-medium pr-4">
            <Link href="#" className="transition-colors hover:text-foreground/80 text-foreground/60" prefetch={false}>Home</Link>
            <Link href="#projects" className="transition-colors hover:text-foreground/80 text-foreground/60" prefetch={false}>Projects</Link>
            <Link href="#skills" className="transition-colors hover:text-foreground/80 text-foreground/60" prefetch={false}>Skills</Link>
            <Link href="#about" className="transition-colors hover:text-foreground/80 text-foreground/60" prefetch={false}>About</Link>
            <Link href="#contact" className="transition-colors hover:text-foreground/80 text-foreground/60" prefetch={false}>Contact</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <HeroSection />
        <Projects />
        <Skills />
        <About />
        <Contact />
      </main>
      <footer className="w-full py-6 border-t">
        <div className="container px-4 md:px-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">&copy; 2024 Leo Joseph. All rights reserved.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6" />
        </div>
      </footer>
    </div>
  );
}

function CodeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}