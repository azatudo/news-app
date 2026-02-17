'use client';

'use client';

import Link from 'next/link';
import { useFavorites } from '@/features/favorites/useFavorites';
import type { Article } from '@/entities/news/model/types';
import NewsCardWeb from '../../entities/news/NewsCardWeb';

export default function FavoritesScreen() {
  const { favorites, loading } = useFavorites();

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0a0a0a',
        color: 'white',
        padding: '32px 20px'
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 28
          }}
        >
          <h1 style={{ fontSize: 28, fontWeight: 700 }}>Favorites</h1>

          <Link
            href="/"
            style={{
              padding: '8px 14px',
              borderRadius: 10,
              background: '#1e293b',
              color: 'white',
              textDecoration: 'none',
              fontSize: 14
            }}
          >
            ← Back to news
          </Link>
        </div>

        {loading && (
          <div style={{ opacity: 0.7 }}>Loading favorites...</div>
        )}

        {!loading && favorites.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '80px 20px',
              background: '#020617',
              borderRadius: 18,
              border: '1px solid #1e293b'
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 16 }}>💔</div>
            <div style={{ fontSize: 20, marginBottom: 8 }}>
              No saved articles yet
            </div>
            <div style={{ opacity: 0.6, fontSize: 14 }}>
              Tap the heart icon on any article to save it here
            </div>
          </div>
        )}

        {!loading && favorites.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: 20
            }}
          >
            {favorites.map((article: Article) => (
              <NewsCardWeb key={article.url} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}