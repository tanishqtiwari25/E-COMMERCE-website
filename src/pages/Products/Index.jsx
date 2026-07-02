import React, { useContext, useState } from 'react';
import { ProductContext } from '../../context/ProductContext';
import { ProductCard } from '../../components/product/ProductCard';
import { SkeletonCard } from '../../components/common/Skeleton';

export const Products = () => {
  const { products, categories, loading } = useContext(ProductContext);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  // Multi tier inline processing filter logic matrix setup
  const filteredProducts = products
    .filter(p => selectedCategory === 'all' || p.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === 'low-high') return a.price - b.price;
      if (sortBy === 'high-low') return b.price - a.price;
      return 0; // maintain transactional consistency
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col lg:flex-row gap-8">
      {/* Control Filters Layout Panel Sidebar */}
      <div className="w-full lg:w-64 shrink-0">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 sticky top-24">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">Categories</h3>
          <div className="space-y-1.5">
            <button 
              onClick={() => setSelectedCategory('all')}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all ${selectedCategory === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
            >
              All Dynamic Collections
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium uppercase transition-all ${selectedCategory === cat ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">Sort Processing</h3>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full text-xs font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              <option value="default">Relevance Allocation</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Primary Products Grid Array display */}
      <div className="flex-1">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
            <p className="text-sm text-slate-500">No active products match selected pipeline parameters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
};