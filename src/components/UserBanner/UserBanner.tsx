import style from './userbanner.module.scss';

export default function UserBanner() {
  const path = window.location.pathname.includes

  return (
    <article className={style.userbannerStyle}>
      <h2>Log ind eller opret dig som bruger</h2>
      <p>
        Når du opretter en profil på Gratissimo får du adgang til at oprette, slette og redigere i job annoncer. Som
        privatperson får du mulighed for at gemme de jobs du kunne være interesseret i.{' '}
      </p>
    </article>
  );
}
