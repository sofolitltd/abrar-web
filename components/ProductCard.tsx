// components/ProductCard.tsx

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types"; // Make sure this path is correct

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Safely get the first image URL from the 'images' array
  const firstImageUrl =
    product.images && product.images.length > 0 ? product.images[0] : undefined;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 border border-gray-100">
      {/* Use product.slug for the Link href */}
      <Link href={`/products/${product.slug}`}>
        {" "}
        {/* This is the correct format */}
        {firstImageUrl && ( // Conditionally render the Image if firstImageUrl exists
          <div className="relative w-full h-48 sm:h-56">
            <Image
              src={firstImageUrl} // Display the first image
              alt={product.name}
              fill
              style={{ objectFit: "contain" }}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="rounded-t-lg"
            />
          </div>
        )}
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 truncate">
            {product.name}
          </h2>

          <div className=" flex gap-3">
            {product.regularPrice > 0 &&
              product.salePrice > 0 &&
              product.regularPrice > product.salePrice && (
                <p className="text-gray-500 text-lg line-through">
                  ৳ {``}
                  {product.regularPrice.toFixed(0)}
                </p>
              )}

            <p className="text-gray-800 text-lg font-bold">
              ৳ {``}
              {(product.salePrice > 0
                ? product.salePrice
                : product.regularPrice
              ).toFixed(0)}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
