import { AlertTriangle } from "lucide-react";
import {
  collection,
  query,
  where,
  getDocs,
  limit,
  DocumentData,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Product } from "@/lib/types";

import BackButton from "@/components/BackButton";
import ProductImageGallery from "@/components/ProductImageGallery";

// This is an async Server Component function
export default async function ProductDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  let slug = (await params).slug;

  // console.log("ProductDetailPage: Raw slug from params:", slug);

  if (slug) {
    slug = decodeURIComponent(slug);
    // console.log("ProductDetailPage: Decoded slug for query:", slug);
  }

  let product: Product | null = null;
  let error: string | null = null;

  try {
    if (!slug) {
      error =
        "Product slug is missing from the URL or could not be determined.";
    } else {
      const productsCollectionRef = collection(db, "products");
      const q = query(
        productsCollectionRef,
        where("slug", "==", slug),
        limit(1)
      );

      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);

      console.log("Firestore Query Snapshot empty:", querySnapshot.empty);
      console.log("Number of documents found:", querySnapshot.docs.length);
      if (!querySnapshot.empty) {
        // console.log("First document data:", querySnapshot.docs[0].data());
      } else {
        console.log(`No product found in Firestore for slug: "${slug}"`);
      }

      if (!querySnapshot.empty) {
        const docSnap = querySnapshot.docs[0];
        product = { id: docSnap.id, ...docSnap.data() } as Product;
      } else {
        error = `Product with slug "${slug}" not found in Firestore. Please check Firestore data.`;
      }
    }
  } catch (err) {
    console.error("Error fetching product from Firestore:", err);
    if (err instanceof Error) {
      console.error("Firebase Error details:", err.message);
    }
    error =
      "Failed to load product details due to a server error. Please try again later.";
  }

  // --- Render based on fetch results ---

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-red-600 bg-red-50 p-8 rounded-lg shadow">
        <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
        <p className="text-xl font-semibold">Oops! Something went wrong.</p>
        <p>{error}</p>
        <BackButton
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-gray-600">
        <AlertTriangle className="h-12 w-12 text-gray-400 mb-4" />
        <p className="text-xl font-semibold">Product Not Found</p>
        <p>
          The product you are looking for does not exist or may have been
          removed.
        </p>
        <BackButton
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        />
      </div>
    );
  }

  const allImages = product.images || []; // Ensure it's an array, even if empty

  return (
    <div className=" ">
      <BackButton  className="mb-4" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 bg-white p-6 sm:p- rounded-xl shadow-xl container mx-auto">
        {/* Product Image Gallery (Client Component) */}
        <div className="md:col-start-1 md:row-start-1 flex flex-col items-center">
          <ProductImageGallery images={allImages} productName={product.name} />
        </div>

        {/* Product Details Section */}
        <div className="md:col-start-2 md:row-start-1">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
            {product.name}
          </h1>

          <div className=" flex gap-4">
            {product.regularPrice > 0 &&
              product.salePrice > 0 &&
              product.regularPrice > product.salePrice && (
                <p className="text-gray-500 text-2xl line-through">
                  {" "}
                  ৳ {``}
                  {product.regularPrice.toFixed(0)}
                </p>
              )}
            <p className="text-2xl sm:text-3xl font-semibold text-blue-600 mb-6">
              ৳ {``}
              {(product.salePrice > 0
                ? product.salePrice
                : product.regularPrice
              ).toFixed(0)}
            </p>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            {product.description ||
              "No description available for this product."}
          </p>

          <div className="text-gray-700 mb-4">
            <span className="font-medium">Brand:</span> {product.brand || "N/A"}
          </div>
          <div className="text-gray-700 mb-4">
            <span className="font-medium">Category:</span>{" "}
            {product.category || "N/A"}
          </div>
          <div className="text-gray-700 mb-4">
            <span className="font-medium">SKU:</span> {product.sku || "N/A"}
          </div>
          <div className="text-gray-700 mb-6">
            <span className="font-medium">Availability:</span>{" "}
            {product.stock > 0 ? (
              <span className="text-green-600 font-semibold">
                {product.stock} in stock
              </span>
            ) : (
              <span className="text-red-600 font-semibold">Out of Stock</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
