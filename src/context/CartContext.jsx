import React, { createContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { toast } from 'react-toastify';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useLocalStorage('ecommerce-cart-system', []);

  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        toast.info(`Updated quantity of ${product.title}`);
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      toast.success(`${product.title} added to shopping cart!`);
      return [...prev, { ...product, quantity: qty }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    toast.warn('Product removed from active cart.');
  };

  const updateQty = (id, change) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const target = item.quantity + change;
          return { ...item, quantity: target < 1 ? 1 : target };
        }
        return item;
      })
    );
  };

  const clearCart = () => setCart([]);

  const subTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const gstAmount = subTotal * 0.18; // 18% standard GST calculation tier
  const grandTotal = subTotal + gstAmount;

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, subTotal, gstAmount, grandTotal }}>
      {children}
    </CartContext.Provider>
  );
};