'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (images && images.length > 0) {
      setSelectedImage(images[0]);
    } else {
      setSelectedImage(undefined);
    }
  }, [images]);

  const placeholderImageUrl = "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?v=1530129081";



  return (
    <div className="flex flex-col items-center">
      {/* Main Product Image Section */}
      <div className="relative h-96  w-96 md:w-80 xl:w-96 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg mb-4">
        {selectedImage ? (
          <Image
            src={selectedImage}
            alt={`${productName} - Main View`}
            fill
            style={{ objectFit: 'contain' }}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
           
          />
        ) : (
          <Image
            src={placeholderImageUrl}
            alt={productName || "No Image"}
            fill
            style={{ objectFit: 'contain' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}

        {/* Optional: Add Left/Right arrows for main image navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => {
                const currentIndex = images.indexOf(selectedImage!);
                const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
                setSelectedImage(images[prevIndex]);
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-300 opacity-50 text-black p-2 rounded-full hover:bg-opacity-75 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 z-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => {
                const currentIndex = images.indexOf(selectedImage!);
                const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
                setSelectedImage(images[nextIndex]);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-300 opacity-50 text-black p-2 rounded-full hover:bg-opacity-75 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 z-10"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      {/* Horizontal Thumbnail List */}
      {images && images.length > 1 && (
        <div
          className=" flex overflow-x-auto gap-4 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg
                     max-w-full
                  
                     /* SCROLLBAR HIDING CLASSES */
                     [ -ms-overflow-style: none; ]
                     [ scrollbar-width: none; ]
                     [&::-webkit-scrollbar]:hidden
                    "
        >
          {images.map((imgUrl, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(imgUrl)}
              className={`flex-shrink-0 w-16 h-16 relative rounded-md overflow-hidden border-2 cursor-pointer
                          ${selectedImage === imgUrl ? 'border-blue-500 shadow-md' : 'border-gray-200 hover:border-blue-300 dark:border-gray-600 dark:hover:border-blue-400'}
                          transition-all duration-200`}
            >
              <Image
                src={imgUrl}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                style={{ objectFit: 'cover' }}
                sizes="64px"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://placehold.co/64x64/cccccc/999999?text=Err`;
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}