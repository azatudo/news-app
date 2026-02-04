console.log('ENV KEY:', process.env.EXPO_PUBLIC_NEWS_API_KEY);
export type NewsArticle = {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  url: string;
};

const API_KEY = process.env.EXPO_PUBLIC_NEWS_API_KEY;

if (!API_KEY) {
  throw new Error('NewsAPI key is missing');
}

export async function fetchNews(): Promise<NewsArticle[]> {
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&pageSize=20&apiKey=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch news');
  }

  const json = await response.json();

  return json.articles.map((item: any, index: number) => ({
    id: `${item.url}-${index}`,
    title: item.title,
    description: item.description,
    publishedAt: item.publishedAt,
    url: item.url,
  }));
}