import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <div className="rounded-2xl shadow-lg p-12 text-center max-w-sm mx-auto"
           style={{backgroundColor: '#FFFFFF'}}>
        <div className="relative mb-6">
          <Loader2 className="h-16 w-16 animate-spin mx-auto" style={{color: '#548BC5'}} />
          <div className="absolute inset-0 h-16 w-16 rounded-full border-2 animate-pulse mx-auto"
               style={{borderColor: '#B9D0E9'}} />
        </div>
        <h3 className="text-xl font-bold mb-2" style={{color: '#2D5B7A'}}>Carregando notícias...</h3>
        <p style={{color: '#2D5B7A'}}>Buscando as últimas atualizações para você</p>
      </div>
    </div>
  );
}