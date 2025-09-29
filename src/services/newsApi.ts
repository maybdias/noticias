const API_KEY = 'eee2a17c8a9c28385a98e09b5448f34e';
const BASE_URL = 'https://gnews.io/api/v4';

export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
}

export interface NewsResponse {
  articles: NewsArticle[];
  totalArticles: number;
}

export const fetchNews = async (
  category: string = 'general',
  query: string = '',
  page: number = 1
): Promise<NewsResponse> => {
  try {
    let apiUrl = '';
    
    if (query) {
      // Para buscas específicas
      apiUrl = `${BASE_URL}/search?q=${encodeURIComponent(query)}&lang=pt&country=br&max=20&token=${API_KEY}`;
    } else {
      // Para categorias - usar top headlines
      let categoryParam = category;
      
      // Mapear categorias para as disponíveis na GNews
      switch (category) {
        case 'general':
          categoryParam = 'general';
          break;
        case 'technology':
          categoryParam = 'technology';
          break;
        case 'business':
          categoryParam = 'business';
          break;
        case 'sports':
          categoryParam = 'sports';
          break;
        case 'health':
          categoryParam = 'health';
          break;
        case 'entertainment':
          categoryParam = 'entertainment';
          break;
        case 'science':
          categoryParam = 'science';
          break;
        case 'politics':
          // GNews não tem categoria política, usar busca por termos
          apiUrl = `${BASE_URL}/search?q=política OR governo OR eleições OR Lula OR Bolsonaro&lang=pt&country=br&max=20&token=${API_KEY}`;
          break;
        default:
          categoryParam = 'general';
      }
      
      // Se não é política, usar top headlines
      if (category !== 'politics') {
        apiUrl = `${BASE_URL}/top-headlines?category=${categoryParam}&lang=pt&country=br&max=20&token=${API_KEY}`;
      }
    }

    console.log('URL da GNews API:', apiUrl);
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Chave da API inválida. Verifique sua API key da GNews.');
      } else if (response.status === 429) {
        throw new Error('Limite de requisições excedido. Tente novamente mais tarde.');
      } else if (response.status === 403) {
        throw new Error('Acesso negado. Verifique sua API key da GNews.');
      } else {
        throw new Error(`Erro na API: ${response.status} - ${response.statusText}`);
      }
    }

    const data = await response.json();
    console.log('Resposta da GNews API:', data);
    
    if (data.errors) {
      throw new Error(data.errors[0] || 'Erro desconhecido da API');
    }

    // Filtrar artigos válidos e mapear para o formato esperado
    const filteredArticles = (data.articles || []).filter((article: any) => 
      article.title && 
      article.description && 
      article.url &&
      article.source?.name
    ).map((article: any) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      urlToImage: article.image, // Mapear 'image' da GNews para 'urlToImage' esperado pelo componente
      publishedAt: article.publishedAt,
      source: {
        name: article.source.name
      }
    }));

    console.log('Artigos filtrados:', filteredArticles.length);

    return {
      articles: filteredArticles,
      totalArticles: data.totalArticles || filteredArticles.length
    };
  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
    
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Erro de conexão. Verifique sua internet e tente novamente.');
  }
};