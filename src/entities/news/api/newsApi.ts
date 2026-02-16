export type NewsArticle = {
  id: string;
  title: string;
  description: string;
  date: string;
  url: string;
  image?: string;
};

const API_KEY = process.env.EXPO_PUBLIC_NEWS_API_KEY;

const BASE_URL = 'https://newsapi.org/v2';

export async function fetchNews(
  page: number = 1,
  query: string = '',
  category: string = 'general'
): Promise<NewsArticle[]> {
  const endpoint = query
    ? `${BASE_URL}/everything?q=${query}&pageSize=10&page=${page}&apiKey=${API_KEY}`
    : `${BASE_URL}/top-headlines?country=us&category=${category}&pageSize=10&page=${page}&apiKey=${API_KEY}`;

  const res = await fetch(endpoint);

  if (!res.ok) {
    throw new Error('Failed to fetch news');
  }

  const json = await res.json();

  return json.articles.map((item: any) => ({
    id: item.url,
    title: item.title,
    description: item.description,
    date: item.publishedAt,
    url: item.url,
    image: item.urlToImage,
  }));
}