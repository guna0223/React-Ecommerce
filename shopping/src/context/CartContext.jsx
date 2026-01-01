import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // added for search

  const addToCart = (product) => {
    setCart(prev => [...prev, product]);
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, searchTerm, setSearchTerm }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
