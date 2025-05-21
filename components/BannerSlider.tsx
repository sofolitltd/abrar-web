// components/BannerSlider.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link"; // Assuming banners might link to pages
import { AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react"; // For navigation arrows
import {
  collection,
  getDocs,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "@/lib/firebase"; // Your Firebase db instance

// Define the type for a banner item fetched from Firestore
interface BannerItem {
  id: string;
  imageUrl: string;
  title?: string; // Optional title for alt text or overlay
  linkUrl?: string; // Optional URL the banner links to
  order?: number; // Optional order for sorting banners
}

const BannerSlider: React.FC = () => {
  const [banners, setBanners] = useState<BannerItem[]>([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false); // To pause auto-play on hover

  // Fetch banners from Firestore
  useEffect(() => {
    const fetchBanners = async () => {
      setLoading(true);
      setError(null);
      try {
        const bannersCollectionRef = collection(db, "banners");
        // Order by 'order' field if it exists, otherwise default Firestore order
        const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
          bannersCollectionRef
        );

        const fetchedBanners: BannerItem[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as BannerItem[];

        // Sort banners by 'order' if the field exists and is a number
        fetchedBanners.sort((a, b) => (a.order || 0) - (b.order || 0));

        setBanners(fetchedBanners);
        if (fetchedBanners.length === 0) {
          setError(
            "No banners found. Please add some banners to the 'banner' collection in Firestore."
          );
        }
      } catch (err) {
        console.error("Error fetching banners from Firestore:", err);
        setError(
          "Failed to load banners. Please check your Firebase connection and rules."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []); // Empty dependency array means this runs once on mount

  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prevIndex) =>
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  }, [banners.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  }, [banners.length]);

  // Auto-animation effect
  useEffect(() => {
    if (banners.length < 2 || isHovered) return; // Don't auto-play if less than 2 slides or hovered

    const autoPlayInterval = setInterval(() => {
      nextSlide();
    }, 10000); // Change slide every 5 seconds

    // Cleanup interval on component unmount or dependencies change
    return () => clearInterval(autoPlayInterval);
  }, [banners.length, nextSlide, isHovered]); // Re-run if banner count or hover state changes

  if (loading) {
    return (
      <div className="flex items-center justify-center mx-auto h-64 sm:h-80 md:h-[500px] bg-gray-100 dark:bg-gray-100 rounded-lg shadow-md">
        <p className="text-gray-50 dark:text-gray-300">Loading banners...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-red-50 dark:bg-red-900 rounded-lg shadow-md text-red-700 dark:text-red-300 p-4">
        <AlertTriangle size={32} className="mb-2" />
        <p className="text-center">{error}</p>
      </div>
    );
  }

  if (banners.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 dark:bg-gray-100 rounded-lg shadow-md">
        <p className="text-gray-50 dark:text-gray-300">No banners available.</p>
      </div>
    );
  }

  const currentBanner = banners[currentSlideIndex];

  return (
    <div
      className="relative w-full max-w-7xl mx-auto h-64 sm:h-80 md:h-[500px] rounded-lg overflow-hidden shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slider Image */}
      {currentBanner && (
        <Link
          href={currentBanner.linkUrl || "#"}
          className="block w-full h-full"
        >
          <Image
            src={currentBanner.imageUrl}
            alt={currentBanner.title || "Banner Image"}
            fill
            priority // Prioritize loading of the first banner image
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
            className="transition-opacity duration-500 ease-in-out"
        
          />
        </Link>
      )}

      {/* Navigation Arrows */}
      {banners.length > 1 && ( // Only show arrows if there's more than one slide
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-50 opacity-50  text-black p-2 rounded-full hover:bg-opacity-75 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} className=" color-black" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-50 opacity-50 text-black p-2 rounded-full hover:bg-opacity-75 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 z-10"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Indicators */}
      {banners.length > 1 && ( // Only show indicators if there's more than one slide
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlideIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === currentSlideIndex
                  ? "bg-blue-500"
                  : "bg-gray-300 dark:bg-gray-600 hover:bg-blue-300 dark:hover:bg-blue-700"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BannerSlider;
