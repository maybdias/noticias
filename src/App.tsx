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
        {/* Stats */}
        {!loading && !error && articles.length > 0 && (
          <div className="mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Últimas Notícias
                  </h2>
                  <p className="text-gray-600">
                    {articles.length} notícias encontradas
                    {searchQuery && ` para "${searchQuery}"`}
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {articles.length}
                  </div>
                  <div className="text-sm text-blue-500">
                    Artigos
                  </div>
                </div>
              </div>
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
            <div className="text-gray-500 text-lg mb-4">
              Nenhuma notícia encontrada
            </div>
            <p className="text-gray-400">
              {searchQuery ? 
                `Não encontramos resultados para "${searchQuery}". Tente outros termos.` :
                'Não há notícias disponíveis no momento.'
              }
            </p>
          </div>
        )}

        {!loading && !error && articles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <NewsCard key={`${article.url}-${index}`} article={article} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">
              eliz<span className="text-blue-400">IA</span>
            </h3>
            <p className="text-gray-400 mb-4">
              Seu portal de notícias em tempo real
            </p>
            <div className="border-t border-gray-800 pt-4">
              <p className="text-sm text-gray-500">
                © 2025 elizIA. Desenvolvido com React e Tailwind CSS.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;