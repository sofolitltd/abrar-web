// app/page.tsx
import { collection, getDocs, query, where, QuerySnapshot, DocumentData } from "firebase/firestore";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/lib/types"; // Adjust path if needed
import { db } from "@/lib/firebase"; // Adjust path if needed
import Link from "next/link"; // Import Link for navigation
import BannerSlider from "@/components/BannerSlider";

export default async function HomePage() {
  let featuredProducts: Product[] = [];
  let error: string | null = null;

  try {
    const productsCollectionRef = collection(db, "products");
    // Create a query to get only featured products
    const featuredProductsQuery = query(productsCollectionRef, where("isFeatured", "==", true));

    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(featuredProductsQuery);

    featuredProducts = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];

    // 
        // console.log("Featured Products JSON:", JSON.stringify(featuredProducts, null, 2));

  } catch (err) {
    console.error("Error fetching featured products from Firestore:", err);
    error = "Failed to load featured products. Please try again later.";
  }

  return (
    <div className="container mx-auto px-4 py-4">
    {/* Your existing home page content */}

      {/* Add the Banner Slider here */}
      <section className="mb-12">
        <BannerSlider />
      </section>

      {/* More home page content */}
      
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 text-center">Featured Products</h2>
      <p className="text-center text-base text-gray-700 dark:text-gray-300 mb-10 ">
        Explore our wide range of products.
      </p>

      {error ? (
        <div className="text-center text-red-500 text-xl">{error}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 mb-12">
            {featuredProducts.length > 0 ? (
              featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-600 text-lg">No featured products found.</div>
            )}
          </div>

          {/* Show More Button */}
          <div className="text-center">
            <Link href="/products" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 ease-in-out shadow-md">
              Show All Products
            </Link>
          </div>
        </>
      )}
    </div>
  );
}