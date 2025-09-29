import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center max-w-sm mx-auto">
        <div className="relative mb-6">
          <Loader2 className="h-16 w-16 text-blue-600 animate-spin mx-auto" />
          <div className="absolute inset-0 h-16 w-16 rounded-full border-2 border-blue-100 animate-pulse mx-auto" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Carregando notícias...</h3>
        <p className="text-gray-600">Buscando as últimas atualizações para você</p>
      </div>
    </div>
  );
}