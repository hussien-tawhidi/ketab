"use client";
import { useEffect, useState } from "react";
import HeroSlider from "./HeroSlider";
import axios from "axios";
import { fetchBooks } from "@/hooks/books";

export default function Hero() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const loadBooks = async () => {
      const fetchedBooks = await fetchBooks();
      setBooks(fetchedBooks);
    };
    loadBooks();
  }, []);

  return (
    <div className='relative md:py-10 py-5 md:mt-0 mt-16 bg-ketab-light'>
      {/* First Slider */}
      <HeroSlider data={books.slice(0, 15)} />

      {/* Second Slider */}
      <HeroSlider data={books.slice(15, 30)} />

      {/* Gradient Overlays */}
      <div className='pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black/70 to-transparent z-10' />
      <div className='pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black/70 to-transparent z-10' />
    </div>
  );
}
