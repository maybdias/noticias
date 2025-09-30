import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4">
      <div className="rounded-2xl p-10 max-w-md w-full text-center shadow-lg"
           style={{
             backgroundColor: '#E8F0F8',
             border: '2px solid #548BC5'
           }}>
        <AlertCircle className="h-20 w-20 mx-auto mb-6" style={{color: '#548BC5'}} />
        <h3 className="text-2xl font-bold mb-3" style={{color: '#2D5B7A'}}>
          Ops! Algo deu errado
        </h3>
        <p className="mb-8 leading-relaxed" style={{color: '#2D5B7A'}}>
          {message}
        </p>
        <button
          onClick={onRetry}
          className="inline-flex items-center px-8 py-3 font-semibold rounded-xl 
                   transition-all duration-200 transform hover:scale-105 hover:shadow-lg 
                   focus:outline-none"
          style={{
            backgroundColor: '#2D5B7A',
            color: '#FFFFFF',
            border: 'none'
          }}
          onMouseEnter={(e) => {
            const target = e.target as HTMLButtonElement;
            target.style.backgroundColor = '#548BC5';
          }}
          onMouseLeave={(e) => {
            const target = e.target as HTMLButtonElement;
            target.style.backgroundColor = '#2D5B7A';
          }}
          onFocus={(e) => {
            const target = e.target as HTMLButtonElement;
            target.style.outline = '2px solid #548BC5';
            target.style.outlineOffset = '2px';
          }}
          onBlur={(e) => {
            const target = e.target as HTMLButtonElement;
            target.style.outline = 'none';
          }}
        >
          <RefreshCw className="mr-3 h-5 w-5" />
          Tentar novamente
        </button>
      </div>
    </div>
  );
}