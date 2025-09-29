import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CategoryFilter from './components/CategoryFilter';
import NewsCard from './components/NewsCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { fetchNews, NewsArticle } from './services/newsApi';

function App() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('general');

  const loadNews = async (category: string = selectedCategory, query: string = searchQuery) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchNews(category, query);
      setArticles(response.articles);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao carregar notícias');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  const handleSearch = () => {
    loadNews(selectedCategory, searchQuery);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    loadNews(category, searchQuery);
  };

  const handleRetry = () => {
    loadNews();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
      />
      
      <CategoryFilter 
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        {!loading && !error && articles.length > 0 && (
          <div className="mb-12">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Últimas Notícias
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto rounded-full mb-6"></div>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {searchQuery ? 
                  `Resultados da busca por "${searchQuery}"` :
                  'Fique por dentro das principais notícias do momento'
                }
              </p>
            </div>
          </div>
        )}

        {/* Content */}
        {loading && <LoadingSpinner />}
        
        {error && (
          <ErrorMessage message={error} onRetry={handleRetry} />
        )}

        {!loading && !error && articles.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              <div className="text-6xl mb-6">📰</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Nenhuma notícia encontrada
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {searchQuery ? 
                  `Não encontramos resultados para "${searchQuery}". Tente outros termos de busca.` :
                  'Não há notícias disponíveis no momento. Tente novamente mais tarde.'
                }
              </p>
            </div>
          </div>
        )}

        {!loading && !error && articles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {articles.map((article, index) => (
              <NewsCard key={`${article.url}-${index}`} article={article} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <h3 className="text-3xl font-bold mb-3">
                eliz<span className="text-blue-400">IA</span>
              </h3>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-300 mx-auto rounded-full mb-4"></div>
              <p className="text-gray-300 text-lg">
                Seu portal de notícias em tempo real
              </p>
            </div>
            <div className="border-t border-gray-700 pt-8">
              <p className="text-gray-400">
                © 2025 elizIA. 
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;