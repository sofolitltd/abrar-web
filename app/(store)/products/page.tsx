// app/products/page.tsx
import {
  collection,
  getDocs,
  query,
  limit,
  orderBy,
  DocumentData,
  QuerySnapshot,
} from "firebase/firestore";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/lib/types";
import { db } from "@/lib/firebase";
import Link from "next/link";
import BackButton from "@/components/BackButton";

// Define how many products per page
const PRODUCTS_PER_PAGE = 8;
// Define how many page numbers to show in the pagination control
const PAGE_NUMBERS_TO_SHOW = 5;

interface AllProductsPageProps {
  searchParams: Promise<{ page?: string }>; // Updated to Promise
}

export default async function AllProductsPage({ searchParams }: AllProductsPageProps) {
  // Resolve the searchParams Promise
  const resolvedSearchParams = await searchParams;
  let allProducts: Product[] = [];
  let error: string | null = null;
  let totalProductsCount = 0;

  const currentPage = Math.max(1, parseInt(resolvedSearchParams.page || "1", 10));

  try {
    const productsCollectionRef = collection(db, "products");
    const baseQuery = query(productsCollectionRef, orderBy("name"));

    // Get total count for pagination
    const countSnapshot = await getDocs(query(productsCollectionRef));
    totalProductsCount = countSnapshot.size;

    // Calculate offset for current page
    const offset = (currentPage - 1) * PRODUCTS_PER_PAGE;

    // Fetch documents for the current page
    const pageQuery = query(baseQuery, limit(offset + PRODUCTS_PER_PAGE));
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(pageQuery);

    // Extract documents for the current page
    allProducts = querySnapshot.docs.slice(offset, offset + PRODUCTS_PER_PAGE).map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];
  } catch (err) {
    console.error("Error fetching all products from Firestore:", err);
    error = "Failed to load all products. Please try again later.";
  }

  // Pagination calculations
  const totalPages = Math.ceil(totalProductsCount / PRODUCTS_PER_PAGE);
  const startPage = Math.max(1, currentPage - Math.floor(PAGE_NUMBERS_TO_SHOW / 2));
  const endPage = Math.min(totalPages, startPage + PAGE_NUMBERS_TO_SHOW - 1);
  const adjustedStartPage = Math.max(1, endPage - PAGE_NUMBERS_TO_SHOW + 1);
  const pageNumbers = Array.from({ length: endPage - adjustedStartPage + 1 }, (_, i) => adjustedStartPage + i);

  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="mb-6">
        <BackButton />
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center">All Products</h1>

      {error ? (
        <div className="text-center text-red-500 text-xl">{error}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 mb-8">
            {allProducts.length > 0 ? (
              allProducts.map(product => <ProductCard key={product.id} product={product} />)
            ) : (
              <div className="col-span-full text-center text-gray-600 text-lg">No products found for this page.</div>
            )}
          </div>

          <div className="flex justify-center items-center mt-8 space-x-2">
            <Link
              href={`/products?page=${currentPage - 1}`}
              className={`px-4 py-2 rounded-lg font-bold transition-colors ${
                hasPreviousPage ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
              aria-disabled={!hasPreviousPage}
              tabIndex={!hasPreviousPage ? -1 : undefined}
            >
              &lt;
            </Link>

            {pageNumbers.map(page => (
              <Link
                key={page}
                href={`/products?page=${page}`}
                className={`px-4 py-2 rounded-lg font-bold transition-colors ${
                  currentPage === page ? "bg-blue-800 text-white" : "bg-blue-200 hover:bg-blue-300 text-blue-800"
                }`}
              >
                {page}
              </Link>
            ))}

            <Link
              href={`/products?page=${currentPage + 1}`}
              className={`px-4 py-2 rounded-lg font-bold transition-colors ${
                hasNextPage ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
              aria-disabled={!hasNextPage}
              tabIndex={!hasNextPage ? -1 : undefined}
            >
              &gt;
            </Link>
          </div>
        </>
      )}
    </div>
  );
}