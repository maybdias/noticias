import React from 'react';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: 'general', name: 'Geral', color: '#84b6f4' },
  { id: 'technology', name: 'Tecnologia', color: '#E8D5F2' },
  { id: 'business', name: 'Negócios', color: '#D5F2E8' },
  { id: 'sports', name: 'Esportes', color: '#F2E8D5' },
  { id: 'health', name: 'Saúde', color: '#F2D5E8' },
  { id: 'entertainment', name: 'Entretenimento', color: '#E8F2D5' },
  { id: 'science', name: 'Ciência', color: '#D5E8F2' },
  { id: 'politics', name: 'Política', color: '#F2D5D5' }
];

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="backdrop-blur-sm border-b sticky top-0 z-10 shadow-md" style={{backgroundColor: 'rgba(255, 255, 255, 0.95)', borderColor: '#548BC5'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6">
          <div className="flex justify-center space-x-2 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className="flex-shrink-0 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200
                           transform hover:scale-105 hover:shadow-md focus:outline-none"
                style={{
                  backgroundColor: selectedCategory === category.id ? 
                    (category.id === 'general' ? '#6ba3f2' : 
                     category.id === 'technology' ? '#d4c1e8' :
                     category.id === 'business' ? '#c1e8d4' :
                     category.id === 'sports' ? '#e8d4c1' :
                     category.id === 'health' ? '#e8c1d4' :
                     category.id === 'entertainment' ? '#d4e8c1' :
                     category.id === 'science' ? '#c1d4e8' :
                     category.id === 'politics' ? '#e8c1c1' : category.color) : category.color,
                  color: selectedCategory === category.id ? '#FFFFFF' : (category.id === 'general' ? '#FFFFFF' : '#2D5B7A'),
                  border: category.id === 'general' ? '1px solid #548BC5' : (selectedCategory === category.id ? 
                    (category.id === 'technology' ? '2px solid #d4c1e8' :
                     category.id === 'business' ? '2px solid #c1e8d4' :
                     category.id === 'sports' ? '2px solid #e8d4c1' :
                     category.id === 'health' ? '2px solid #e8c1d4' :
                     category.id === 'entertainment' ? '2px solid #d4e8c1' :
                     category.id === 'science' ? '2px solid #c1d4e8' :
                     category.id === 'politics' ? '2px solid #e8c1c1' : '2px solid #548BC5') : '1px solid #548BC5'),
                  boxShadow: category.id === 'general' ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : (selectedCategory === category.id ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : 'none')
                }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLButtonElement;
                  if (selectedCategory !== category.id) {
                    if (category.id === 'general') {
                      target.style.backgroundColor = '#6ba3f2';
                    } else {
                      target.style.backgroundColor = '#E8F0F8';
                    }
                  }
                  target.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLButtonElement;
                  if (selectedCategory !== category.id) {
                    target.style.backgroundColor = category.color;
                  }
                  target.style.boxShadow = selectedCategory === category.id ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : 'none';
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
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}