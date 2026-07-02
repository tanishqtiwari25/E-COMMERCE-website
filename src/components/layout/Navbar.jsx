import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiUser, FiSun, FiMoon, FiSearch, FiMenu } from 'react-icons/fi';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import { WishlistContext } from '../../context/WishlistContext';
import { ThemeContext } from '../../context/ThemeContext';
import { ProductContext } from '../../context/ProductContext';

export const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const { products } = useContext(ProductContext);

  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.trim().length > 1) {
      const filtered = products.filter(p => p.title.toLowerCase().includes(val.toLowerCase())).slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSuggestions([]);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Branding Engine */}
        <Link to="/" className="text-2xl font-black tracking-tighter text-indigo-600 dark:text-indigo-400">
          PICKK<span className="text-slate-900 dark:text-white">.</span>
        </Link>

        {/* Global Search Interface with Interactive Auto Suggestions Engine */}
        <div className="hidden md:flex flex-1 max-w-md relative">
          <div className="w-full relative">
            <input 
              type="text"
              placeholder="Search premium catalog..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full bg-slate-50 dark:bg-slate-900 text-sm pl-4 pr-10 py-2.5 rounded-full border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-slate-100"
            />
            <FiSearch className="absolute right-3.5 top-3 text-slate-400 w-4 h-4" />
          </div>

          {suggestions.length > 0 && (
            <div className="absolute top-12 left-0 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50">
              {suggestions.map(p => (
                <Link 
                  key={p.id} 
                  to={`/product/${p.id}`}
                  onClick={clearSearch}
                  className="block px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b last:border-0 border-slate-100 dark:border-slate-800"
                >
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">{p.title}</div>
                  <div className="text-[11px] text-indigo-500 font-bold mt-0.5">${p.price}</div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Action Controls Layout Array */}
        <div className="flex items-center space-x-1 sm:space-x-3">
          <button onClick={toggleTheme} className="p-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors">
            {theme === 'dark' ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
          </button>

          <Link to="/wishlist" className="p-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors relative">
            <FiHeart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1.5 right-1.5 bg-rose-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center animate-pulse">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link to="/cart" className="p-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors relative">
            <FiShoppingCart className="w-5 h-5" />
            {totalCartItems > 0 && (
              <span className="absolute top-1.5 right-1.5 bg-indigo-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {totalCartItems}
              </span>
            )}
          </Link>

          <Link to={user ? "/profile" : "/login"} className="p-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors flex items-center space-x-1">
            <FiUser className="w-5 h-5" />
            {user && <span className="hidden lg:inline text-xs font-semibold text-slate-700 dark:text-slate-300">{user.name.split(' ')[0]}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
};