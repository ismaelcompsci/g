"use client";

import { BookCustomizer } from "@/components/book-customizer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col gap-4 justify-center">
      <BookCustomizer />
      <footer className="pt-12 text-center text-sm text-gray-500 space-x-4 justify-center">
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground text-sm transition-all duration-300 hover:underline hover:text-primary"
          href="https://vercel.com/geist/book"
        >
          Vercel Book
        </a>

        <a
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground text-sm transition-all duration-300 hover:underline hover:text-primary"
          href="https://github.com/ismaelcompsci/gbook"
        >
          Github
        </a>
      </footer>
    </div>
  );
}
