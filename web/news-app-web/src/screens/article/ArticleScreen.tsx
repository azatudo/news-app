'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { fetchNews } from '@/shared/api/newsApi';
import type { Article } from '@/entities/news/model/types';
import { useRouter } from 'next/navigation';

type Props = {
  id: string;
};

export default function ArticleScreen({ id }: Props) {
  const [article, setArticle] = useState<Article | null>(null);
  const router = useRouter();

  useEffect(() => {
    const decodedUrl = decodeURIComponent(id);

    const load = async () => {
      // try multiple pages because the article may not be on page 1
      for (let page = 1; page <= 5; page++) {
        const list = await fetchNews({ page });
        const found = list.find((a: Article) => a.url === decodedUrl);

        if (found) {
          setArticle(found);
          return;
        }
      }

      // nothing found
      setArticle(null);
    };

    load();
  }, [id]);

  if (!article) return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#e5e5e5', padding: 40 }}>
      Loading article...
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#e5e5e5', padding: '40px 16px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <button
          onClick={() => router.back()}
          style={{
            marginBottom: 20,
            background: 'transparent',
            border: '1px solid #333',
            color: '#e5e5e5',
            padding: '8px 14px',
            borderRadius: 8,
            cursor: 'pointer'
          }}
        >
          ← Back
        </button>
        <h1 style={{ fontSize: 34, fontWeight: 700, marginBottom: 12, lineHeight: 1.2 }}>
          {article.title}
        </h1>

        <div style={{ color: '#9ca3af', marginBottom: 18, fontSize: 14 }}>
          {article.source} · {article.date}
        </div>

        {article.image && (
          <Image
            src={article.image}
            alt={article.title}
            width={900}
            height={500}
            style={{ width: '100%', height: 'auto', borderRadius: 14, marginBottom: 22 }}
          />
        )}

        <p style={{ lineHeight: 1.8, fontSize: 18, color: '#d4d4d4' }}>
          {article.description}
        </p>

        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            marginTop: 28,
            padding: '12px 18px',
            background: '#ffffff',
            color: '#000',
            borderRadius: 10,
            textDecoration: 'none',
            fontWeight: 600
          }}
        >
          Read original article →
        </a>
      </div>
    </div>
  );
}