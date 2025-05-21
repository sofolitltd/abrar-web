"use client"; // This directive is for Next.js App Router, keep if environment supports it
import Link from "next/link"; // This is a Next.js specific import
import { ShoppingCart, UserCircle, Search } from "lucide-react"; // Standard import
// useCart and useAuth are available from context definitions above

const Navbar = () => {
  // const { cartItems } = useCart(); // Direct use
  // const { userId, loading: authLoading } = useAuth(); // Direct use
  // const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className=" text-2xl  text-primary-600 hover:text-primary-700 transition-colors"
            >
              <span className=" text-blue-500 text-2xl font-bold">Abrar </span>
              Shop
            </Link>
          </div>
          <div className="flex items-center space-x-4 sm:space-x-6">
            <Link
              href="/search"
              className="relative text-gray-600 hover:text-primary-600 transition-colors flex items-center space-x-1"
            >
              <Search size={20} />

              {/* )} */}
            </Link>

            <Link
              href="/cart"
              className="relative text-gray-600 hover:text-primary-600 transition-colors flex items-center space-x-1"
            >
              <ShoppingCart size={20} />
              {/* <span>Cart</span> */}
              {/* {itemCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount} */}
              {/* </span> */}
              {/* )} */}
            </Link>
            {/* <div className="text-gray-600 flex items-center space-x-1" title={authLoading ? "Loading user..." : (userId || "Not signed in")}> */}
            <UserCircle size={20} />
            {/* {authLoading ? (
                <span className="text-xs italic">Loading...</span>
              ) : userId ? (
                <span className="text-xs truncate max-w-[100px] sm:max-w-[150px]" >UID: {userId}</span>
              ) : (
                <span className="text-xs italic">Guest</span>
              )} */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
