import React from 'react';
import { Calendar, ExternalLink, User } from 'lucide-react';

interface NewsCardProps {
  article: {
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    source: {
      name: string;
    };
    author?: string;
  };
}

export default function NewsCard({ article }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    // Gerar uma imagem aleatória diferente para cada notícia
    const randomId = Math.floor(Math.random() * 1000) + 1;
    target.src = `https://picsum.photos/400/200?random=${randomId}`;
  };

  return (
    <article className="rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 
                       transform hover:scale-[1.03] hover:-translate-y-2 overflow-hidden group
                       border"
             style={{
               backgroundColor: '#FFFFFF',
               borderColor: '#B9D0E9'
             }}>
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {article.urlToImage ? (
          <img
            src={article.urlToImage}
            alt={article.title}
            onError={handleImageError}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center"
               style={{
                 background: 'linear-gradient(to bottom right, #E8F0F8, #B9D0E9, #B9D0E9)'
               }}>
            <div className="text-center" style={{color: '#548BC5'}}>
              <div className="text-4xl mb-2">📰</div>
              <div className="text-sm font-medium">Sem imagem</div>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 
                       group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Source and Date */}
        <div className="flex items-center justify-between mb-3">
          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{
                  background: 'linear-gradient(to right, #B9D0E9, #E8F0F8)',
                  color: '#2D5B7A',
                  border: '1px solid #548BC5'
                }}>
            {article.source.name}
          </span>
          <div className="flex items-center text-xs" style={{color: '#2D5B7A'}}>
            <Calendar className="h-3 w-3 mr-1" />
            {formatDate(article.publishedAt)}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-3 line-clamp-2 transition-colors duration-200"
             style={{color: '#2D5B7A'}}
             onMouseEnter={(e) => {
               const target = e.target as HTMLHeadingElement;
               target.style.color = '#548BC5';
             }}
             onMouseLeave={(e) => {
               const target = e.target as HTMLHeadingElement;
               target.style.color = '#2D5B7A';
             }}>
          {article.title}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed mb-6 line-clamp-3" style={{color: '#2D5B7A'}}>
          {article.description || 'Descrição não disponível para esta notícia.'}
        </p>

        {/* Author */}
        {article.author && (
          <div className="flex items-center text-xs mb-4" style={{color: '#2D5B7A'}}>
            <User className="h-3 w-3 mr-1" />
            Por {article.author}
          </div>
        )}

        {/* Read More Button */}
        <div className="flex justify-end">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 
                     transform hover:scale-105 hover:shadow-lg focus:outline-none"
            style={{
              color: '#548BC5',
              border: '2px solid #548BC5',
              backgroundColor: 'transparent'
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLAnchorElement;
              target.style.color = '#FFFFFF';
              target.style.backgroundColor = '#2D5B7A';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLAnchorElement;
              target.style.color = '#548BC5';
              target.style.backgroundColor = 'transparent';
            }}
            onFocus={(e) => {
              const target = e.target as HTMLAnchorElement;
              target.style.outline = '2px solid #548BC5';
              target.style.outlineOffset = '2px';
            }}
            onBlur={(e) => {
              const target = e.target as HTMLAnchorElement;
              target.style.outline = 'none';
            }}
          >
            Ler mais
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}