// "use client";
// import Image from 'next/image'; // Already imported
// // import { CartItemWithId as CartItemTypeWithId } from '../lib/types'; // CartItemWithId is global
// // import { useCart as useCartHookD } from '../context/CartContext'; // useCart is global
// import { PlusCircle, MinusCircle, Trash2 } from 'lucide-react'; // Standard
// import { CartItemWithId } from '@/lib/types';

// interface CartItemDisplayProps {
//   item: CartItemWithId; // Use global CartItemWithId
// }

// const CartItemDisplay = ({ item }: CartItemDisplayProps) => {
//   const { updateQuantity, removeFromCart } = useCart(); // Direct use

//   return (
//     <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white rounded-lg shadow mb-4">
//       <div className="flex items-center space-x-4">
//         <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden">
//          <Image
//             src={item.imageUrl || `https://placehold.co/100x100/cccccc/999999?text=${encodeURIComponent(item.name)}`}
//             alt={item.name}
//             fill
//             style={{ objectFit: 'cover' }}
//             onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/100x100/cccccc/999999?text=Img+Error`; }}
//           />
//         </div>
//         <div>
//           <h3 className="text-sm sm:text-base font-semibold text-gray-800">{item.name}</h3>
//           <p className="text-xs sm:text-sm text-gray-500">${item.price.toFixed(2)} each</p>
//         </div>
//       </div>
//       <div className="flex items-center space-x-2 sm:space-x-4">
//         <div className="flex items-center space-x-1 sm:space-x-2">
//           <button
//             onClick={() => updateQuantity(item.id, item.quantity - 1)}
//             className="text-primary-500 hover:text-primary-700 p-1 rounded-full transition-colors"
//             aria-label="Decrease quantity"
//           >
//             <MinusCircle size={20} />
//           </button>
//           <span className="text-sm sm:text-base font-medium w-8 text-center">{item.quantity}</span>
//           <button
//             onClick={() => updateQuantity(item.id, item.quantity + 1)}
//             className="text-primary-500 hover:text-primary-700 p-1 rounded-full transition-colors"
//             aria-label="Increase quantity"
//           >
//             <PlusCircle size={20} />
//           </button>
//         </div>
//         <p className="text-sm sm:text-base font-semibold text-gray-800 w-20 text-right">
//           ${(item.price * item.quantity).toFixed(2)}
//         </p>
//         <button
//           onClick={() => removeFromCart(item.id)}
//           className="text-red-500 hover:text-red-700 p-1 rounded-full transition-colors"
//           aria-label="Remove item"
//         >
//           <Trash2 size={20} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CartItemDisplay;