import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { Input } from '../../components/common/Input';
import { formatCurrency } from '../../utils/formatters';
import { toast } from 'react-toastify';

export const Checkout = () => {
  const { cart, grandTotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', street: '', city: '', zip: '', card: '' });

  const handleValidationProcess = (e) => {
    e.preventDefault();
    if (!form.name || !form.street || !form.city || !form.zip) {
      toast.error('All processing dispatch parameters must be declared.');
      return;
    }
    toast.success('Transaction cleared successfully across banking pipelines.');
    clearCart();
    navigate('/order-success');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 p-6 rounded-3xl shadow-sm">
        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4">Consignee Routing Logistics</h3>
        <form onSubmit={handleValidationProcess} className="space-y-1">
          <Input label="Full Name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="Johnathan Doe" />
          <Input label="Street Line Distribution" value={form.street} onChange={(e) => setForm({...form, street: e.target.value})} placeholder="1024 Mainframe Blvd Suite 4" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="City Endpoint" value={form.city} onChange={(e) => setForm({...form, city: e.target.value})} placeholder="San Francisco" />
            <Input label="Postal Routing Zip" value={form.zip} onChange={(e) => setForm({...form, zip: e.target.value})} placeholder="94105" />
          </div>
          <Input label="Card Vault String Allocation" value={form.card} onChange={(e) => setForm({...form, card: e.target.value})} placeholder="4111 2222 3333 4444" />
          <button type="submit" className="w-full mt-6 bg-indigo-600 text-white font-semibold text-xs py-4 rounded-xl shadow-md hover:bg-indigo-700 transition-all">
            Commit Dynamic Liquidation Settlement ({formatCurrency(grandTotal)})
          </button>
        </form>
      </div>

      <div className="bg-slate-100 dark:bg-slate-900/40 p-6 rounded-3xl border border-slate-200/40 dark:border-slate-800">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Pipeline Core Validation Matrix</h3>
        <div className="max-h-64 overflow-y-auto space-y-3 pr-2 no-scrollbar">
          {cart.map(item => (
            <div key={item.id} className="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span className="truncate max-w-[200px]">{item.title} <span className="text-indigo-500 font-bold">x{item.quantity}</span></span>
              <span>{formatCurrency(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-slate-200 dark:border-slate-800 pt-4 mt-4 flex justify-between text-sm font-black text-slate-900 dark:text-white">
          <span>Gross Payable Aggregate</span>
          <span className="text-indigo-600 dark:text-indigo-400">{formatCurrency(grandTotal)}</span>
        </div>
      </div>
    </div>
  );
};