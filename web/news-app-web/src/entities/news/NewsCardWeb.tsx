import type { Article } from '@/entities/news/model/types';
import Link from 'next/link';
import { useFavoritesStore } from '@/features/favorites/favoritesStore';
import Image from 'next/image';

type Props = {
  article: Article;
};

export default function NewsCardWeb({ article }: Props) {
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const fav = isFavorite(article);

  return (
    <Link href={`/news/${encodeURIComponent(article.url)}`} style={{ textDecoration: 'none' }}>
      <article
        style={{
          borderRadius: 12,
          overflow: 'hidden',
          background: '#111',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          cursor: 'pointer',
          position: 'relative',
          boxShadow: '0 2px 6px rgba(0,0,0,0.5)'
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.02)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.7)'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 6px rgba(0,0,0,0.5)'; }}
      >
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(article);
          }}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            zIndex: 2,
            background: 'rgba(0,0,0,0.7)',
            border: 'none',
            borderRadius: 999,
            width: 36,
            height: 36,
            fontSize: 18,
            color: fav ? '#ff4d4f' : '#ccc',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {fav ? '♥' : '♡'}
        </button>

        {article.image && (
          <Image
            src={article.image}
            alt={article.title}
            width={800}
            height={240}
            style={{ width: '100%', height: 240, objectFit: 'cover' }}
          />
        )}

        <div style={{ padding: 16 }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: 20, lineHeight: 1.3, color: '#fff' }}>
            {article.title}
          </h3>

          {article.description && (
            <p style={{ opacity: 0.8, margin: '0 0 10px 0', color: '#ddd', fontSize: 14, lineHeight: 1.4 }}>
              {article.description}
            </p>
          )}

          <small style={{ opacity: 0.6, fontSize: 12, color: '#aaa' }}>
            {article.source}
          </small>
        </div>
      </article>
    </Link>
  );
}