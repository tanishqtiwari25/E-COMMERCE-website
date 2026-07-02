import React from 'react';

export const Input = ({ label, type = 'text', error, ...props }) => (
  <div className="mb-4 w-full">
    {label && <label className="block text-sm font-semibold tracking-wide text-slate-700 dark:text-slate-300 mb-1.5">{label}</label>}
    <input
      type={type}
      className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 transition-all focus:outline-none focus:ring-2 ${
        error 
          ? 'border-rose-500 focus:ring-rose-200 dark:focus:ring-rose-900/30' 
          : 'border-slate-200 dark:border-slate-800 focus:ring-indigo-100 dark:focus:ring-indigo-900/30 focus:border-indigo-500'
      }`}
      {...props}
    />
    {error && <p className="text-rose-500 text-xs mt-1.5 font-medium">{error}</p>}
  </div>
);