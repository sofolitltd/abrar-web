// "use client";
// import Link from 'next/link'; 
// import CartItemDisplay from "@/components/CartItemDisplay"
// import { ShoppingCart as ShoppingCartIcon, XCircle, Loader2 as LoaderIcon } from 'lucide-react'; 
// const CartPage = () => { 
//   const { cartItems, cartTotal, clearCart, loadingCart } = useCart(); // Direct use

//   if (loadingCart) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-gray-600">
//         <LoaderIcon className="animate-spin h-12 w-12 text-primary-500 mb-4" />
//         <p className="text-lg">Loading your cart...</p>
//       </div>
//     );
//   }

//   if (cartItems.length === 0) {
//     return (
//       <div className="text-center py-12">
//         <ShoppingCartIcon size={64} className="mx-auto text-gray-400 mb-6" />
//         <h1 className="text-2xl sm:text-3xl font-semibold text-gray-700 mb-3">Your Cart is Empty</h1>
//         <p className="text-gray-500 mb-8">Looks like you have not added anything to your cart yet.</p>
//         <Link
//           href="/"
//           className="px-8 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors shadow hover:shadow-md"
//         >
//           Start Shopping
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto">
//       <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8">Your Shopping Cart</h1>
      
//       <div className="space-y-4 mb-8">
//         {cartItems.map(item => (
//           <CartItemDisplay key={item.id} item={item} /> // CartItemDisplay is global
//         ))}
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">Cart Total:</h2>
//           <p className="text-xl sm:text-2xl font-bold text-primary-600">${cartTotal.toFixed(2)}</p>
//         </div>
//         <p className="text-sm text-gray-500 mb-6 text-right">Shipping and taxes calculated at checkout.</p>
        
//         <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
//           <button
//             onClick={clearCart}
//             className="flex items-center justify-center px-6 py-3 border border-red-500 text-red-500 font-semibold rounded-lg hover:bg-red-50 transition-colors"
//           >
//             <XCircle size={20} className="mr-2" />
//             Clear Cart
//           </button>
//           <button
//             onClick={() => console.log('Checkout functionality not implemented yet.')} // Use console.log instead of alert
//             className="flex items-center justify-center px-8 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors shadow hover:shadow-md"
//           >
//             Proceed to Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default CartPage;