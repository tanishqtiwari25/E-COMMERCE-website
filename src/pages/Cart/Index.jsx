import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2, FiPlus, FiMinus, FiArrowRight } from 'react-icons/fi';
import { CartContext } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatters';

export const Cart = () => {
  const { cart, updateQty, removeFromCart, subTotal, gstAmount, grandTotal } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-24 px-4">
        <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Your Shopping Cart is Empty</h2>
        <p className="text-sm text-slate-500 mt-2 mb-8">Add items to your cart to start building your order framework.</p>
        <Link to="/products" className="inline-block bg-indigo-600 text-white font-semibold text-xs px-6 py-3.5 rounded-xl hover:bg-indigo-700 transition-all">
          Return To Digital Products Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white mb-6">Shopping Cart Checkout Pipeline</h1>
        {cart.map(item => (
          <div key={item.id} className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800/60 shadow-sm">
            <img src={item.image} alt={item.title} className="w-16 h-16 object-contain mix-blend-multiply dark:mix-blend-normal bg-slate-50 p-2 rounded-xl shrink-0" />
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{item.title}</h4>
              <span className="text-[11px] font-medium text-slate-400 block uppercase tracking-wide mt-0.5">{item.category}</span>
              <div className="text-sm font-bold text-indigo-600 mt-1">{formatCurrency(item.price)}</div>
            </div>
            
            {/* Control Increments Block Layout */}
            <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800 shrink-0">
              <button onClick={() => updateQty(item.id, -1)} className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"><FiMinus className="w-3 h-3" /></button>
              <span className="px-3 text-xs font-bold text-slate-800 dark:text-slate-200">{item.quantity}</span>
              <button onClick={() => updateQty(item.id, 1)} className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"><FiPlus className="w-3 h-3" /></button>
            </div>

            <button onClick={() => removeFromCart(item.id)} className="p-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 dark:bg-rose-950/20 dark:hover:bg-rose-950/40 rounded-xl transition-colors shrink-0">
              <FiTrash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Cart Processing Summary Container Panels */}
      <div className="w-full">
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm sticky top-24">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">Settlement Summary</h3>
          <div className="space-y-3 text-xs font-medium text-slate-600 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex justify-between"><span>Subtotal Metrics</span><span className="text-slate-900 dark:text-white font-bold">{formatCurrency(subTotal)}</span></div>
            <div className="flex justify-between"><span>Unified Corporate GST (18%)</span><span className="text-slate-900 dark:text-white font-bold">{formatCurrency(gstAmount)}</span></div>
            <div className="flex justify-between"><span>Shipping Allocation Charges</span><span className="text-emerald-600 font-bold">FREE COMPLIMENTARY</span></div>
          </div>
          <div className="flex justify-between text-sm font-bold text-slate-900 dark:text-white pt-4 mb-6">
            <span>Grand Gross Total</span>
            <span className="text-lg text-indigo-600 dark:text-indigo-400">{formatCurrency(grandTotal)}</span>
          </div>

          <Link to="/checkout" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs py-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2">
            Proceed To Checkout Line <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};