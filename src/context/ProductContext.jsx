import React, { createContext, useState, useEffect } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    try {
      // Local Mock Data System (Bina kisi API ke chalega)
      const mockProducts = [
        {
          id: 1,
          title: "Vortex Premium Cyber Hoodie",
          price: 2999,
          description: "Premium cotton cyberpunk style hoodie with neon accents and relaxed fit.",
          category: "clothing",
          image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500",
          brand: 'Premium Lux',
          oldPrice: 3999,
          stockStatus: 'In Stock',
          reviewsCount: 142,
          rating: { rate: 4.5 }
        },
        {
          id: 2,
          title: "Quantum Wireless Earbuds Pro",
          price: 4500,
          description: "Active noise cancelling premium earbuds with 40h total battery backup.",
          category: "electronics",
          image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
          brand: 'Premium Lux',
          oldPrice: 5999,
          stockStatus: 'In Stock',
          reviewsCount: 88,
          rating: { rate: 4.8 }
        },
        {
          id: 3,
          title: "Minimalist Leather Chronograph",
          price: 8999,
          description: "Sleek matte-black stainless steel watch with genuine Italian leather straps.",
          category: "accessories",
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
          brand: 'Premium Lux',
          oldPrice: 11999,
          stockStatus: 'In Stock',
          reviewsCount: 65,
          rating: { rate: 4.2 }
        },
        {
          id: 4,
          title: "Ergonomic Mechanical Keyboard",
          price: 6200,
          description: "RGB backlit hot-swappable mechanical keyboard with linear red switches.",
          category: "electronics",
          image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
          brand: 'Premium Lux',
          oldPrice: 7500,
          stockStatus: 'Out of Stock',
          reviewsCount: 210,
          rating: { rate: 4.7 }
        }
      ];

      const mockCategories = ["all", "clothing", "electronics", "accessories"];

      setProducts(mockProducts);
      setCategories(mockCategories);
    } catch (err) {
      setError('System error on local product resolution layers.');
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <ProductContext.Provider value={{ products, categories, loading, error }}>
      {children}
    </ProductContext.Provider>
  );
};