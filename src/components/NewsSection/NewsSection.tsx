import type { Article } from '../../types/types';
import NewsItem from '../NewsItem/NewsItem';
import style from './newssection.module.scss';


export default function NewsSection({header, news}: {header: string, news: Article[]}) {
  

  const renderedNews = news.map((article) => <NewsItem article={article} />);

  return (
    <section className={style.newssectionStyle}>
      <h2>{header}</h2>
      <article>{renderedNews}</article>
    </section>
  );
}
