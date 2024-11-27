"use client";
import { BookCustomizer } from "@/components/book-customizer";

export default function Home() {
  return (
    <div className="h-full flex flex-col justify-between">
      <BookCustomizer />

      <div className="w-full pb-8 flex items-center justify-center">
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground text-sm transition-all duration-300 hover:underline hover:text-primary"
          href="https://vercel.com/geist/book"
        >
          Vercel Book
        </a>
      </div>
    </div>
  );
}
