import style from "./searchresults.module.scss";
// Trykker brugeren på ”Alle jobs” i navigationsmenuen tages de til søgeresultat siden,
// uden nogle søgekriterier. Det vil sige at alle jobannoncer vises når brugeren ikke har
// søgt på noget.
// Øverst på søgeresultat siden vises søgeren med tilhørende filtrering.
// 8
// Hver jobannonce har to knapper. En ”Gem” knap og en ”Åben” knap. Gem knappen
// skal gemme annoncen i brugerens favoritter. Dette kan gøres gennem API´et men det
// kræver at brugeren er logget ind. Der skal derfor vises en besked til brugeren om at
// de skal logge ind før de kan gemme en jobannonce. Det er op til dig at designe denne
// del
export default function Searchresults() {
  return (<div className={style.searchresultsStyle}><h1>Hej</h1></div>)
};