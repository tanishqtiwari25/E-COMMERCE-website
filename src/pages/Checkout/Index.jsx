import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { Input } from '../../components/common/Input';
import { formatCurrency } from '../../utils/formatters';
import { toast } from 'react-toastify';

// ⚠️ Google Apps Script se mila Deployment URL yahan paste karein
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzzEZ7odNMTYYhbkie92bWsRm4z_hqKMH2BMjRW7iiKBaRwqCVf0k__H7nW5kmSbPdw/exec";

export const Checkout = () => {
  const { cart, grandTotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    street: '', 
    city: '', 
    zip: '', 
    card: '' 
  });

  const handleValidationProcess = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.street || !form.city || !form.zip) {
      toast.error('All processing dispatch parameters must be declared.');
      return;
    }

    if (cart.length === 0) {
      toast.error('Cart is empty.');
      return;
    }

    setIsSubmitting(true);

    const fullAddress = `${form.street}, ${form.city} - ${form.zip}`;
    
    const orderPayload = {
      customer: {
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: fullAddress
      },
      items: cart,
      totalAmount: grandTotal,
      orderDate: new Date().toLocaleString()
    };

    try {
      if (GOOGLE_SCRIPT_URL !== "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL") {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderPayload),
        });
      }

      toast.success('Transaction cleared successfully across banking pipelines.');
      clearCart();
      navigate('/order-success');
    } catch (error) {
      console.error("Order process error:", error);
      toast.error('Order submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 p-6 rounded-3xl shadow-sm">
        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4">Consignee Routing Logistics</h3>
        <form onSubmit={handleValidationProcess} className="space-y-1">
          <Input 
            label="Full Name" 
            value={form.name} 
            onChange={(e) => setForm({...form, name: e.target.value})} 
            placeholder="Johnathan Doe" 
          />
          <Input 
            label="Email Identity" 
            type="email"
            value={form.email} 
            onChange={(e) => setForm({...form, email: e.target.value})} 
            placeholder="john@example.com" 
          />
          <Input 
            label="Phone Endpoint" 
            type="tel"
            value={form.phone} 
            onChange={(e) => setForm({...form, phone: e.target.value})} 
            placeholder="+91 9876543210" 
          />
          <Input 
            label="Street Line Distribution" 
            value={form.street} 
            onChange={(e) => setForm({...form, street: e.target.value})} 
            placeholder="1024 Mainframe Blvd Suite 4" 
          />
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="City Endpoint" 
              value={form.city} 
              onChange={(e) => setForm({...form, city: e.target.value})} 
              placeholder="San Francisco" 
            />
            <Input 
              label="Postal Routing Zip" 
              value={form.zip} 
              onChange={(e) => setForm({...form, zip: e.target.value})} 
              placeholder="94105" 
            />
          </div>
          <Input 
            label="Card Vault String Allocation" 
            value={form.card} 
            onChange={(e) => setForm({...form, card: e.target.value})} 
            placeholder="4111 2222 3333 4444" 
          />
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full mt-6 bg-indigo-600 text-white font-semibold text-xs py-4 rounded-xl shadow-md hover:bg-indigo-700 transition-all disabled:opacity-50"
          >
            {isSubmitting ? "Processing Settlement..." : `Commit Dynamic Liquidation Settlement (${formatCurrency(grandTotal)})`}
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