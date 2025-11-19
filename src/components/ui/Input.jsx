import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export const Input = ({ label, error = null, className = '', showToggle = false, ...props }) => {
  const [visible, setVisible] = useState(false);

  const isPassword = props.type === 'password';
  const inputType = isPassword && showToggle ? (visible ? 'text' : 'password') : props.type || 'text';

  const base = 'w-full rounded-md border px-3 py-2 transition focus:outline-none';
  const paddingRight = isPassword && showToggle ? 'pr-10' : '';
  const errorClasses = error ? 'border-red-500 focus:ring-2 focus:ring-red-100' : 'border-gray-300 focus:ring-2 focus:ring-blue-100';

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div className="relative">
        <input className={`${base} ${paddingRight} ${errorClasses}`} {...props} type={inputType} />

        {isPassword && showToggle && (
          <button
            type="button"
            aria-label={visible ? 'Hide password' : 'Show password'}
            onClick={() => setVisible((v) => !v)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {visible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>

      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
};