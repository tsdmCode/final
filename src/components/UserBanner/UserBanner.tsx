import style from './userbanner.module.scss';

export default function UserBanner({
  mode,
  userName = '',
}: {
  mode: 'register' | 'minside' | 'annonce';
  userName: string;
}) {
  
  if (mode === 'annonce') {
    return (
      <article className={style.userbannerStyle}>
        <h2>Opret en annonce og find frivillige til din forening</h2>
        <p>
          Gratissimo er gratis for alle. Frivillige, organisationer og foreninger. Du skaber det frivillige liv og vi
          formidler kontakten. Når du har fundet en frivillig til din forening, kan du blot fjerne annoncen igen ved at
          gå til din side.
        </p>
        <a href="/minside">Gå til min side</a>
      </article>
    );
  }

  return (
    <article className={style.userbannerStyle}>
      {mode === 'register' ? (
        <>
          <h2>Log ind eller opret dig som bruger</h2>
          <p>
            Når du opretter en profil på Gratissimo får du adgang til at oprette, slette og redigere i job annoncer. Som
            privatperson får du mulighed for at gemme de jobs du kunne være interesseret i.{' '}
          </p>
        </>
      ) : (
        <>
          <h2>Hej {userName}</h2>
          <p>
            Rediger eller slet dine annoncer. Du kan også danne dig et overblik over de annoncer du har gemt som
            favorit, samt fjerne dem igen
          </p>
        </>
      )}
    </article>
  );
}
