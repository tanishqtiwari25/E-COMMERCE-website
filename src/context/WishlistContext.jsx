import React, { createContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { toast } from 'react-toastify';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useLocalStorage('ecommerce-wishlist-system', []);

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const isExist = prev.find((item) => item.id === product.id);
      if (isExist) {
        toast.info('Removed from active wishlist.');
        return prev.filter((item) => item.id !== product.id);
      }
      toast.success('Added to collection engine wishlist!');
      return [...prev, product];
    });
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};