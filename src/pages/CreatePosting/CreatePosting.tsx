import style from "./createposting.module.scss";
// Opret annonce siden består af en header der viser noget tekst og en formular, som
// anvist i designet. For at oprette en annonce skal man være logget ind. Du skal derfor
// gøre brugeren opmærksom på at de skal logge ind før de kan oprette en annonce.
// På siden skal der være en form der indeholder følgende elementer:
// - Overskrift
// - Organisation / Forening
// - Lokation
// - Kategori
// - Arbejdstid
// - Adresse
// - Postnummer
// - By
// Der skal være validering på alle felter i denne form og der skal gives besked til
// brugeren om hvilke felter de har udfyldt forkert samt hvorfor.
// Når man trykker ”Opret annonce” skal alt information sendes til API´et hvor annoncen
// gemmes og brugeren får en besked om at de har oprettet en annonce
export default function CreatePosting() {
  return (<div className={style.createpostingStyle}><h1>hej</h1></div>)
};