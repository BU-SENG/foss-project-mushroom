import React from 'react';

export const Select = ({ label, options, error = null, className = '', children, ...props }) => {
  const base = 'w-full rounded-md border px-3 py-2 bg-white transition focus:outline-none';
  const errorClasses = error ? 'border-red-500 focus:ring-2 focus:ring-red-100' : 'border-gray-300 focus:ring-2 focus:ring-blue-100';

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <select className={`${base} ${errorClasses}`} {...props}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
        {children}
      </select>
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
};