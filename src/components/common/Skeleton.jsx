import React from 'react';

export const SkeletonCard = () => (
  <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-4 animate-pulse bg-white dark:bg-slate-900">
    <div className="h-48 bg-slate-200 dark:bg-slate-800 rounded-xl mb-4" />
    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-2/3 mb-2" />
    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2 mb-4" />
    <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-full" />
  </div>
);