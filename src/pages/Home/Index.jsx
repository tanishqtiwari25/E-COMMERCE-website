import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiShield, FiTruck, FiActivity } from 'react-icons/fi';
import { ProductContext } from '../../context/ProductContext';
import { ProductCard } from '../../components/product/ProductCard';
import { SkeletonCard } from '../../components/common/Skeleton';

export const Home = () => {
  const { products, loading } = useContext(ProductContext);
  const coreDeals = products.slice(0, 4);

  return (
    <div className="w-full pb-16">
      {/* Premium Hero Complex Segment */}
      <section className="relative bg-gradient-to-br from-indigo-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-20 lg:py-32 overflow-hidden mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
              Next-Gen Ecosystem Launch
            </span>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
              The Evolution of <span className="text-indigo-600 dark:text-indigo-400">Premium Shopping.</span>
            </h1>
            <p className="mt-6 text-base text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
              Experience the ultra-smooth checkout flows, high performance design systems, and hyper-optimized collection suites built for portfolios.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/products" className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-semibold transition-all shadow-lg shadow-indigo-600/20 flex items-center gap-2 group">
                Explore Catalog <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:flex justify-center"
          >
            <img 
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80" 
              alt="Premium Product Banner" 
              className="rounded-3xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 object-cover h-[450px] w-[450px]"
            />
          </motion.div>
        </div>
      </section>

      {/* Featured Catalog Core Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Trending Technical Products</h2>
            <p className="text-xs text-slate-500 mt-1">Handpicked curated products based on real architectural integrations.</p>
          </div>
          <Link to="/products" className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
            See All <FiArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {coreDeals.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>

      {/* Features Value Pillars Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-100 dark:border-slate-900 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl text-emerald-600">
              <FiTruck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Global Express Freight</h4>
              <p className="text-xs text-slate-500 mt-1">Ultra reliable transit logistics with instant pipeline event tracking tags.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/30 rounded-2xl text-indigo-600">
              <FiShield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Encrypted Settlement</h4>
              <p className="text-xs text-slate-500 mt-1">Complete PCI-DSS secure isolation matrix using secure card interface standardizations.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-2xl text-amber-600">
              <FiActivity className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">24/7 SLA Engineering Response</h4>
              <p className="text-xs text-slate-500 mt-1">Direct pipeline routing directly connected to tier 3 active help center arrays.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};