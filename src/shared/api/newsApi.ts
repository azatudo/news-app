const BASE_URL = 'https://newsapi.org/v2';
const API_KEY = process.env.EXPO_PUBLIC_NEWS_API_KEY ?? '';

export type FetchNewsParams = {
  page?: number;
  query?: string;
  category?: string;
  sort?: 'publishedAt' | 'relevancy';
};

export async function fetchNews({
  page = 1,
  query = '',
  category = 'general',
  sort = 'publishedAt',
}: FetchNewsParams) {
  const url = query
    ? `${BASE_URL}/everything?q=${encodeURIComponent(query)}&page=${page}&sortBy=${sort}&apiKey=${API_KEY}`
    : `${BASE_URL}/top-headlines?country=us&category=${category}&page=${page}&apiKey=${API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch news');

  const data = await response.json();

  return (data.articles ?? []).map((a: any) => ({
    id: a.url,
    title: a.title ?? '',
    description: a.description ?? '',
    date: a.publishedAt ?? '',
    url: a.url,
    image: a.urlToImage ?? null,
    source: a.source?.name ?? '',
  }));
}