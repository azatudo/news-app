type Article = {
  title: string;
  description: string | null;
};

async function getNews(): Promise<Article[]> {
  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`,
    { cache: 'no-store' }
  );

  const data = await res.json();
  return data.articles ?? [];
}

export default async function Page() {
  const articles = await getNews();

  return (
    <main style={{ padding: 24 }}>
      <h1>News</h1>

      {articles.map((a, i) => (
        <div key={i} style={{ marginBottom: 20 }}>
          <h3>{a.title}</h3>
          <p>{a.description}</p>
        </div>
      ))}
    </main>
  );
}