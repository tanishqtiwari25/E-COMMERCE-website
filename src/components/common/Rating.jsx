import React from 'react';
import { FiStar } from 'react-icons/fi';

export const Rating = ({ rate = 0, count }) => {
  return (
    <div className="flex items-center space-x-1">
      <div className="flex text-amber-400">
        {[...Array(5)].map((_, i) => (
          <FiStar key={i} className={`fill-current ${i < Math.round(rate) ? 'text-amber-400' : 'text-slate-200 dark:text-slate-700'}`} />
        ))}
      </div>
      {count !== undefined && <span className="text-xs text-slate-500 ml-1">({count})</span>}
    </div>
  );
};