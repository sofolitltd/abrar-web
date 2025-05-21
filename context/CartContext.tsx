
// interface CartContextType {
//   cartItems: CartItemWithId[];
//   addToCart: (product: Product, quantity?: number) => Promise<void>; // Use global Product type
//   removeFromCart: (itemId: string) => Promise<void>;
//   updateQuantity: (itemId: string, quantity: number) => Promise<void>;
//   clearCart: () => Promise<void>;
//   loadingCart: boolean;
//   cartTotal: number;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [cartItems, setCartItems] = useState<CartItemWithId[]>([]);
//   const [loadingCart, setLoadingCart] = useState(true);
//   const { userId } = useAuth(); // useAuth is defined above

//   const getCartCollectionRef = React.useCallback(() => { // Added React.useCallback
//     if (!userId || !appIdCart || !fdbCart) return null;
//     return collection(fdbCart, `artifacts/${appIdCart}/users/${userId}/cart`);
//   }, [userId]); // appIdCart and fdbCart are from firebaseUtils, effectively constant

//   useEffect(() => {
//     if (!userId || !appIdCart || !fdbCart) {
//       setCartItems([]); 
//       setLoadingCart(false);
//       return;
//     }

//     setLoadingCart(true);
//     const cartCollectionRef = getCartCollectionRef();
//     if (!cartCollectionRef) {
//         setLoadingCart(false);
//         return;
//     }

//     const unsubscribe = firebaseUtils.firestoreOnSnapshot(cartCollectionRef, (snapshot) => { // Use renamed firestoreOnSnapshot
//       const items: CartItemWithId[] = snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() } as CartItemWithId));
//       setCartItems(items);
//       setLoadingCart(false);
//     }, (error) => {
//       console.error("Error fetching cart items:", error);
//       setLoadingCart(false);
//     });

//     return () => unsubscribe();
//   }, [userId, getCartCollectionRef]); // getCartCollectionRef dependency

//   const addToCart = async (product: Product, quantity: number = 1) => { // Use global Product type
//     if (!userId || !appIdCart || !fdbCart) {
//       console.error("Cannot add to cart: User or Firebase not initialized.");
//       return;
//     }
//     setLoadingCart(true);
//     const cartCollectionRef = getCartCollectionRef();
//     if (!cartCollectionRef) {
//         setLoadingCart(false);
//         return;
//     }

//     try {
//       const existingItemQuery = query(cartCollectionRef, where("productId", "==", product.id));
//       const querySnapshot = await getDocs(existingItemQuery);

//       if (!querySnapshot.empty) {
//         const existingDoc = querySnapshot.docs[0];
//         const existingCartItem = existingDoc.data() as CartItem; // Use global CartItem
//         const newQuantity = existingCartItem.quantity + quantity;
//         await updateDoc(doc(cartCollectionRef, existingDoc.id), { quantity: newQuantity });
//       } else {
//         const newItem: CartItem = { // Use global CartItem
//           productId: product.id,
//           name: product.name,
//           price: product.price,
//           imageUrl: product.imageUrl,
//           quantity: quantity,
//         };
//         await addDoc(cartCollectionRef, { ...newItem, createdAt: serverTimestamp() });
//       }
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//     } finally {
//       // setLoadingCart(false); // onSnapshot will handle this
//     }
//   };

//   const removeFromCart = async (itemId: string) => {
//     if (!userId || !appIdCart || !fdbCart) return;
//     // setLoadingCart(true); // onSnapshot handles loading
//     const cartCollectionRef = getCartCollectionRef();
//     if (!cartCollectionRef) return;
//     try {
//       await deleteDoc(doc(cartCollectionRef, itemId));
//     } catch (error) {
//       console.error("Error removing from cart:", error);
//     } 
//   };

//   const updateQuantity = async (itemId: string, quantity: number) => {
//     if (!userId || !appIdCart || !fdbCart) return;
    
//     const cartCollectionRef = getCartCollectionRef();
//     if (!cartCollectionRef) return;

//     if (quantity <= 0) {
//       await removeFromCart(itemId);
//     } else {
//       // setLoadingCart(true); // onSnapshot handles loading
//       try {
//         await updateDoc(doc(cartCollectionRef, itemId), { quantity });
//       } catch (error) {
//         console.error("Error updating quantity:", error);
//       }
//     }
//   };
  
//   const clearCart = async () => {
//     if (!userId || !appIdCart || !fdbCart) return;
//     // setLoadingCart(true); // onSnapshot handles loading
//     const cartCollectionRef = getCartCollectionRef();
//     if (!cartCollectionRef) return;

//     try {
//       const batch = writeBatch(fdbCart); // Use fdbCart from firebaseUtils
//       cartItems.forEach(item => {
//         batch.delete(doc(cartCollectionRef, item.id));
//       });
//       await batch.commit();
//     } catch (error) {
//       console.error("Error clearing cart:", error);
//     }
//   };

//   const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

//   return (
//     <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, loadingCart, cartTotal }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// const useCart = (): CartContextType => {
//   const context = useContext(CartContext);
//   if (context === undefined) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// };
