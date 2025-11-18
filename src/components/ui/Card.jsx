import React from 'react';

export const Card = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm p-4 sm:p-6 ${className}`}>
      {title && <div className="mb-3 text-lg font-semibold text-gray-800">{title}</div>}
      <div className="text-sm text-gray-700">{children}</div>
    </div>
  );
};