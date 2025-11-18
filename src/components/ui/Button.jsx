import React from 'react';

export const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '', 
  disabled, 
  loading = false, // Added loading prop for future use
  ...props 
}) => {
  // Enhanced base classes for a smooth, rounded look with subtle shadow
  const baseClasses = "font-medium rounded-xl transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg active:shadow-sm flex items-center justify-center gap-2";

  const sizeClasses = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-7 py-3 text-lg",
  };

  // Updated variant classes using less "shouty", softer Tailwind colors
  const variantClasses = {
    // Primary: Sleek Indigo
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white border border-indigo-700",
    
    // Secondary: Light Gray/Slate with a subtle border
    secondary: "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300",
    
    // Danger: Muted Rose/Red for importance, not shouting
    danger: "bg-rose-600 hover:bg-rose-700 text-white border border-rose-700",
    
    // Added Success variant, useful for forms
    success: "bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-700",
  };

  const effectiveClasses = variantClasses[variant] || variantClasses.primary;
  
  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${effectiveClasses} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {/* Optional loading spinner placeholder */}
      {loading ? (
        <span className="animate-spin h-5 w-5 border-t-2 border-white rounded-full"></span>
      ) : (
        children
      )}
    </button>
  );
};