import { useEffect, useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import style from './testimonials.module.scss';
import type { Testimony } from '../../types/types';

export default function Testimonials() {
  const { data, isLoading, error } = useFetch<Testimony[]>(import.meta.env.VITE_URL + '/api/testimony');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const timeout = setTimeout(() => {
      setIndex((prev) => (prev + 1) % data.length);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [data?.length, index, data]);

   if (isLoading) {
    return <h2>Lav mig om til en loadingspinner...</h2>;
  }

  if (error) {
    return <h2>Kunne ikke finde testimonials</h2>;
  }

  const testimonyArr = data?.map((testimony) => {
    return (
      <article key={testimony.id}>
        <h2>{testimony.title}</h2>
        <p>{testimony.content}</p>
        <p>{testimony.name}</p>
      </article>
    );
  });

  return (
    <section className={style.testimonialsStyle}>
      {testimonyArr?.[index]}
      <div className={style.dots}>
        {data?.map((testimony, i) => (
          <button
            key={testimony.id}
            className={`${style.dot} ${i === index ? style.active : ''}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}
