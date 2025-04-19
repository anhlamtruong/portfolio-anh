"use client";

import React from "react";

interface ErrorFallbackProps {
  error: string;
  resetErrorBoundary?: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <div className="flex flex-col items-center justify-center  p-8 text-center bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        Oops! Something went wrong (╯°□°）╯︵ ┻━┻
      </h1>
      <p className="mb-6 text-lg text-gray-700">{error} (；へ：)</p>
      <button
        onClick={resetErrorBoundary}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Try Again (ᵔᴥᵔ)
      </button>
    </div>
  );
};

export default ErrorFallback;
