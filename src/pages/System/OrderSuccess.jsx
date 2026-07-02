import React from 'react';
import { Link } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';

export const OrderSuccess = () => {
  return (
    <div className="max-w-md mx-auto text-center py-24 px-4">
      <div className="inline-flex items-center justify-center p-4 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500 rounded-full mb-6 animate-bounce">
        <FiCheckCircle className="w-12 h-12" />
      </div>
      <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Pipeline Processing Cleared</h1>
      <p className="text-xs text-slate-500 mt-2 mb-8 leading-relaxed">
        Transaction settled successfully across distribution layers. Your asset code sequence identifier is active.
      </p>
      <Link to="/" className="bg-indigo-600 text-white text-xs font-semibold px-6 py-3.5 rounded-xl hover:bg-indigo-700 transition-all shadow-md">
        Return To Operational Terminal Home
      </Link>
    </div>
  );
};