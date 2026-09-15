import type { Article } from '../../types/types';
import style from './newsitem.module.scss';
import { useNavigate } from 'react-router';

export default function NewsItem({ article }: { article: Article }) {
  const navigate = useNavigate();

  return (
    <figure onClick={() => navigate(`/news/${article.id}`)} className={style.newsitemStyle}>
      <img src={import.meta.env.VITE_URL + article.imageUrl} alt={article.title} />
      <figcaption>
        <p className={style.date}>
          d.{' '}
          {Intl.DateTimeFormat('da-DK', { dateStyle: 'short' })
            .format(new Date(article.createdAt))
            .slice(0, 5)
            .replace('.', '/')}{' '}
          {article.author}
        </p>
        <h3>{article.title}</h3>
      </figcaption>
    </figure>
  );
}
