import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="max-w-md mx-auto text-center py-24 px-4">
      <h1 className="text-6xl font-black text-indigo-600 dark:text-indigo-400 tracking-tighter">404</h1>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-4">Node Disconnected</h3>
      <p className="text-xs text-slate-500 mt-2 mb-8">The requested digital URL parameter routing coordinate does not exist.</p>
      <Link to="/" className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold text-xs px-6 py-3.5 rounded-xl transition-all">
        Back To System Mainframe
      </Link>
    </div>
  );
};