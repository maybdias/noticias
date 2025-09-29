import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4">
      <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-10 max-w-md w-full text-center shadow-lg">
        <AlertCircle className="h-20 w-20 text-red-500 mx-auto mb-6" />
        <h3 className="text-2xl font-bold text-red-800 mb-3">
          Ops! Algo deu errado
        </h3>
        <p className="text-red-600 mb-8 leading-relaxed">
          {message}
        </p>
        <button
          onClick={onRetry}
          className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-red-600 to-red-500 
                   text-white font-semibold rounded-xl hover:from-red-700 hover:to-red-600 
                   transition-all duration-200 transform hover:scale-105 hover:shadow-lg 
                   focus:outline-none focus:ring-2 focus:ring-red-500 
                   focus:ring-offset-2"
        >
          <RefreshCw className="mr-3 h-5 w-5" />
          Tentar novamente
        </button>
      </div>
    </div>
  );
}