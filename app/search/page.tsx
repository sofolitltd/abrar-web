// app/search/page.tsx
'use client';

import { Suspense, useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { collection, getDocs, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Image from 'next/image';
import Link from 'next/link';
import { AlertTriangle, Search as SearchIcon, XCircle } from 'lucide-react';
import BackButton from '@/components/BackButton';

// Define the structure of the lightweight product for caching
interface CachedProduct {
  id: string;
  name: string;
  description?: string;
  slug: string;
  regularPrice: number;
  salePrice?: number;
  firstImage?: string;
}

// Key for localStorage
const CACHE_KEY = 'product_search_cache_full_details';
const CACHE_TIMESTAMP_KEY = 'product_search_cache_timestamp_full_details';
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

// Child component that uses useSearchParams
function SearchResults({
  initialQuery,
  cachedProducts,
  displayedProducts,
  setDisplayedProducts,
  loading,
  error,
  message,
  setMessage,
}: {
  initialQuery: string;
  cachedProducts: CachedProduct[];
  setCachedProducts: (products: CachedProduct[]) => void;
  displayedProducts: CachedProduct[];
  setDisplayedProducts: (products: CachedProduct[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  message: string | null;
  setMessage: (message: string | null) => void;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [queryInput, setQueryInput] = useState(initialQuery);

  // Function to filter products based on search term
  const filterProducts = useCallback(
    (products: CachedProduct[], searchTerm: string) => {
      const trimmedSearchTerm = searchTerm.trim().toLowerCase();

      if (!trimmedSearchTerm) {
        setDisplayedProducts(products);
        setMessage('Enter a search query to filter products.');
        return;
      }

      const filtered = products.filter(product => {
        const name = product.name?.toString().toLowerCase() || '';
        const description = product.description?.toString().toLowerCase() || '';
        const slug = product.slug?.toString().toLowerCase() || '';

        return name.includes(trimmedSearchTerm) || description.includes(trimmedSearchTerm) || slug.includes(trimmedSearchTerm);
      });

      setDisplayedProducts(filtered);

      if (filtered.length === 0) {
        setMessage(`No products found matching "${searchTerm}".`);
      } else {
        setMessage(null);
      }
    },
    [setDisplayedProducts, setMessage]
  );

  // Effect to re-filter products and update URL
  useEffect(() => {
    const handler = setTimeout(() => {
      filterProducts(cachedProducts, queryInput);

      if (queryInput !== (searchParams.get('q') || '')) {
        const newUrl = queryInput.trim() ? `/search?q=${encodeURIComponent(queryInput.trim())}` : '/search';
        router.push(newUrl);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [queryInput, cachedProducts, searchParams, router, filterProducts]);

  return (
    <div>
      <div className="flex items-center space-x-1 w-full max-w-md mx-auto px-3 py-1 border border-gray-300 rounded-lg shadow-sm focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-200 transition-all duration-200">
        <SearchIcon size={20} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search products..."
          value={queryInput}
          onChange={e => setQueryInput(e.target.value)}
          className="flex-grow p-2 outline-none border-none focus:ring-0 text-gray-700 placeholder-gray-400"
        />
        {queryInput && (
          <button
            onClick={() => setQueryInput('')}
            className="p-1 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-200"
            aria-label="Clear search"
          >
            <XCircle size={20} />
          </button>
        )}
      </div>

      <h1 className="text-2xl sm:text-2xl mt-5 font-bold text-gray-800 mb-8 text-center">
        Search Results {queryInput && `for "${queryInput}"`}
      </h1>

      {error ? (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-red-600 bg-red-50 p-8 rounded-lg shadow">
          <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
          <p className="text-xl font-semibold">Oops! Something went wrong with the search.</p>
          <p>{error}</p>
        </div>
      ) : loading ? (
        <div className="text-center text-gray-600 text-lg p-8">Loading products for search...</div>
      ) : message ? (
        <div className="text-center text-gray-600 text-lg p-8">{message}</div>
      ) : (
        <div className="space-y-4">
          {displayedProducts.map(product => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="flex items-center bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex-shrink-0 w-16 h-16 relative mr-4 rounded-md overflow-hidden">
                <Image
                  src={product.firstImage || ``}
                  alt={product.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="80px"
              
                />
              </div>
              <div className="flex-grow">
                <h3 className="text-base font-semibold text-gray-800">{product.name}</h3>
                <div className="flex items-baseline mt-1">
                  {product.regularPrice > 0 && product.salePrice && product.regularPrice > product.salePrice && (
                    <span className="text-gray-500 text-sm line-through mr-2">  ৳ {``}{product.regularPrice.toFixed(0)}</span>
                  )}
                  <span className="text-blue-600 text-lg font-bold">
                      ৳ {``}{(product.salePrice && product.salePrice > 0 ? product.salePrice : product.regularPrice).toFixed(0)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// Main SearchPage component
export default function SearchPage() {
  const [cachedProducts, setCachedProducts] = useState<CachedProduct[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<CachedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // Load cache from localStorage
  const loadCache = useCallback(() => {
    if (typeof window === 'undefined') return false;

    const cachedData = localStorage.getItem(CACHE_KEY);
    const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);

    if (cachedData && cachedTimestamp) {
      const parsedData: CachedProduct[] = JSON.parse(cachedData);
      const parsedTimestamp: number = parseInt(cachedTimestamp, 10);

      if (Date.now() - parsedTimestamp < CACHE_TTL_MS) {
        setCachedProducts(parsedData);
        setLoading(false);
        setMessage('Enter a search query to filter products.');
        return true;
      } else {
        console.log('Product cache expired. Re-fetching...');
      }
    }
    return false;
  }, []);

  // Fetch and cache products from Firestore
  const fetchAndCacheProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const productsCollectionRef = collection(db, 'products');
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(productsCollectionRef);

      const fetchedProductsForCache: CachedProduct[] = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || 'Untitled Product',
          description: data.description || '',
          slug: data.slug || doc.id,
          regularPrice: data.regularPrice || 0,
          salePrice: data.salePrice || 0,
          firstImage: data.images?.[0] || undefined,
        };
      });

      setCachedProducts(fetchedProductsForCache);
      if (typeof window !== 'undefined') {
        localStorage.setItem(CACHE_KEY, JSON.stringify(fetchedProductsForCache));
        localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
      }

      if (fetchedProductsForCache.length === 0) {
        setMessage('No products found in the database.');
      } else {
        setMessage('Enter a search query to filter products.');
      }
    } catch (err) {
      console.error('Error fetching products for cache from Firestore:', err);
      setError('Failed to load products. Please try again later.');
      setCachedProducts([]);
      setDisplayedProducts([]);
    } finally {
      setLoading(false);
    }
  }, [setDisplayedProducts]);

  // Load cache or fetch products on mount
  useEffect(() => {
    const cacheLoaded = loadCache();
    if (!cacheLoaded) {
      fetchAndCacheProducts();
    }
  }, [loadCache, fetchAndCacheProducts]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex justify-between items-center">
        <BackButton />
      </div>

      <Suspense fallback={<div className="text-center text-gray-600 text-lg p-8">Loading search results...</div>}>
        <SearchResults
          initialQuery={''} // Initial query will be handled by useSearchParams in the child
          cachedProducts={cachedProducts}
          setCachedProducts={setCachedProducts}
          displayedProducts={displayedProducts}
          setDisplayedProducts={setDisplayedProducts}
          loading={loading}
          setLoading={setLoading}
          error={error}
          setError={setError}
          message={message}
          setMessage={setMessage}
        />
      </Suspense>
    </div>
  );
}