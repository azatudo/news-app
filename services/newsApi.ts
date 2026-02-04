export type NewsArticle = {
  id: string;
  title: string;
  description: string;
  date: string;
  url: string;
};

const API_KEY = process.env.EXPO_PUBLIC_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2/top-headlines';

export async function fetchNews(
  page: number,
  pageSize = 20
): Promise<NewsArticle[]> {
  const res = await fetch(
    `${BASE_URL}?country=us&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`
  );

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
  }));
}