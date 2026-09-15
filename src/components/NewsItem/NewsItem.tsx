import type { Article } from '../../types/types';
import style from './newsitem.module.scss';

export default function NewsItem({ article }: { article: Article }) {
  return (
    <figure className={style.newsitemStyle}>
      <img src={import.meta.env.VITE_URL + article.imageUrl} alt="" />
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
