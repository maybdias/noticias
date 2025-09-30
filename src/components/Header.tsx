import React from 'react';
import { Search } from 'lucide-react';
import AccessibilityControls from './AccessibilityControls';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: () => void;
}

export default function Header({ searchQuery, setSearchQuery, onSearch }: HeaderProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <header className="shadow-xl" style={{background: 'linear-gradient(to right, #7BA7D1, #9BC2E8, #7BA7D1)'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="/robot (1).png" 
              alt="elizIA Logo" 
              className="h-12 w-12 rounded-xl object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold tracking-tight" style={{color: '#2D5B7A'}}>
                eliz<span style={{color: '#4a8ee8'}}>IA</span>
              </h1>
              <p className="text-xs font-medium" style={{color: '#2D5B7A'}}>Notícias em Tempo Real</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5" style={{color: '#548BC5'}} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Buscar notícias..."
                className="block w-full pl-10 pr-3 py-3 border rounded-xl 
                         backdrop-blur-sm transition-all duration-200"
                style={{
                  borderColor: '#548BC5',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  color: '#2D5B7A',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  const target = e.target as HTMLInputElement;
                  target.style.outline = '2px solid #548BC5';
                  target.style.borderColor = '#548BC5';
                }}
                onBlur={(e) => {
                  const target = e.target as HTMLInputElement;
                  target.style.outline = 'none';
                  target.style.borderColor = '#548BC5';
                }}
              />
            </div>
          </div>

          {/* Action Button */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onSearch}
              className="font-medium px-6 py-3 rounded-xl
                       transition-all duration-200 transform hover:scale-105 hover:shadow-lg focus:outline-none"
              style={{
                backgroundColor: '#5a9ef0',
                color: '#FFFFFF',
                border: 'none',
                outline: 'none'
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.backgroundColor = '#4a8ee8';
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.backgroundColor = '#5a9ef0';
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
              Buscar
            </button>
            
            <AccessibilityControls />
          </div>
        </div>
      </div>
    </header>
  );
}