import style from './news.module.scss';
// Nyhedssiden viser enten den nyhed brugeren har valgt på forsiden, eller en tilfældig
// udvalgt nyhed hvis man klikker på nyheder i navigationsmenuen.
// Under den valgte nyhed, vises alle nyheder i et grid, som anvist i designet. Klikkes der
// på en af disse skal denne vises og siden skal scrolle til toppen
export default function News() {
  return (
    <div className={style.newsStyle}>
      <h1>Hej</h1>
    </div>
  );
}
