import style from "./mypage.module.scss";
// Header:
// I toppen af Min side vises teksten Velkommen [navn på brugeren]. Der skal også være
// to links; et til at logge ud og et til at gå til rediger profil. Trykker brugeren på log ud,
// skal alle variabler/cookies/storage der gemmer brugerens data ryddes og brugeren
// skal føres tilbage til log ind siden. Derudover skal der sendes en log out request til
// API´et så brugerens refresh token slettes.
// Side skifter:
// Min side er todelt med en ”skifter” i toppen af siden. Der kan enten vælges Mine
// annoncer eller Mine favoritter. Den valgte side skal highlightes med rød og skifte til
// det modsatte når brugeren trykker på denne.
// Mine annoncer:
// Under Mine annoncer skal brugeren kunne se alle de jobannoncer som de har
// oprettet. Hertil skal der være mulighed for at slette en annonce eller redigere den
// hvis man har valgt dette som tilvalgsopgave (se længere nede).
// Mine favoritter
// Under Mine favoritter vises alle de jobannoncer som brugeren har gemt. Her skal det
// være muligt at åbne annoncen eller at fjerne den som favorit. Hvis du vælger at lave
// pagination som tilvalgsopgave skal denne også vises på både Mine annoncer og Mine
// favoritter.
export default function Mypage() {
  return (<div className={style.mypageStyle}><h1>hej</h1></div>)
};