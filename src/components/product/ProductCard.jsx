import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiEye } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { WishlistContext } from '../../context/WishlistContext';
import { Rating } from '../common/Rating';
import { formatCurrency, calculateDiscount } from '../../utils/formatters';

export const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  
  const isWishlisted = wishlist.some(item => item.id === product.id);
  const discount = calculateDiscount(product.oldPrice, product.price);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group relative border border-slate-100 dark:border-slate-900 bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
    >
      {/* Top badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
        {discount > 0 && (
          <span className="bg-rose-500 text-white text-[11px] font-bold tracking-wider px-2.5 py-1 rounded-full uppercase">
            -{discount}% Off
          </span>
        )}
        {product.stockStatus === 'Out of Stock' && (
          <span className="bg-slate-800 text-white text-[10px] font-bold px-2 py-0.5 rounded">
            SOLD OUT
          </span>
        )}
      </div>

      {/* Heart interaction configuration wrapper */}
      <button 
        onClick={() => toggleWishlist(product)}
        className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-slate-600 dark:text-slate-300 shadow-sm transition-all hover:bg-white dark:hover:bg-slate-800"
      >
        <FiHeart className={`w-5 h-5 transition-transform active:scale-95 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
      </button>

      {/* Image Context Layout Component block frame */}
      <Link to={`/product/${product.id}`} className="block overflow-hidden relative bg-slate-50 dark:bg-slate-950 p-6">
        <img 
          src={product.image} 
          alt={product.title}
          className="h-48 w-full object-contain mix-blend-multiply dark:mix-blend-normal transform transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </Link>

      <div className="p-5">
        <span className="text-[11px] font-semibold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
          {product.category}
        </span>
        <Link to={`/product/${product.id}`} className="block mt-1 mb-2">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {product.title}
          </h3>
        </Link>

        <div className="mb-3">
          <Rating rate={product.rating?.rate} count={product.reviewsCount} />
        </div>

        <div className="flex items-center justify-between mt-4 border-t border-slate-50 dark:border-slate-800/50 pt-4">
          <div>
            <span className="text-lg font-bold text-slate-900 dark:text-white">
              {formatCurrency(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-xs text-slate-400 line-through ml-2">
                {formatCurrency(product.oldPrice)}
              </span>
            )}
          </div>

          <button 
            disabled={product.stockStatus === 'Out of Stock'}
            onClick={() => addToCart(product)}
            className="p-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white rounded-xl transition-all shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/20 active:scale-95"
          >
            <FiShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};