export type NewsArticle = {
  id: string;
  title: string;
  description: string;
  date: string;
  url: string;
};

const API_KEY = process.env.EXPO_PUBLIC_NEWS_API_KEY;
const PAGE_SIZE = 20;
const BASE_URL = 'https://newsapi.org/v2';

export async function fetchNews(
  page: number,
  query?: string
): Promise<NewsArticle[]> {
  if (!API_KEY) {
    throw new Error('NewsAPI key is missing');
  }

  const endpoint = query
    ? `${BASE_URL}/everything?q=${encodeURIComponent(query)}`
    : `${BASE_URL}/top-headlines?country=us`;

  const res = await fetch(
    `${endpoint}&page=${page}&pageSize=${PAGE_SIZE}&apiKey=${API_KEY}`
  );

  if (!res.ok) {
    const text = await res.text();
    console.log('NEWS API ERROR:', text);
    throw new Error('Failed to fetch news');
  }

  const json = await res.json();

  return json.articles.map((item: any) => ({
    id: item.url,
    title: item.title,
    description: item.description,
    date: item.publishedAt,
    url: item.url,
  }));
}