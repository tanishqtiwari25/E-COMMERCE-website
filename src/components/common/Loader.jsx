import React from 'react';

export const Spinner = ({ size = 'h-8 w-8' }) => (
  <div className="flex justify-center items-center py-4">
    <div className={`animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600 dark:border-slate-800 dark:border-t-indigo-400 ${size}`} />
  </div>
);