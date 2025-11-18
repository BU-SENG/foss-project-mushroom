import React from 'react';

export const StatusBadge = ({ status, className = '' }) => {
  const s = String(status || '').toLowerCase();

  const base = 'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium';

  const colorMap = {
    pending: 'bg-yellow-100 text-yellow-800',
    'in progress': 'bg-blue-100 text-blue-800',
    resolved: 'bg-green-100 text-green-800',
  };

  const classes = colorMap[s] || 'bg-gray-100 text-gray-800';

  return <span className={`${base} ${classes} ${className}`}>{status}</span>;
};