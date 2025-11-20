import React from "react";

export const LoadingSpinner = () => {
  return (
    <div>
      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-7rem)]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    </div>
  );
};

