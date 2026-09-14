import style from './login.module.scss';
// På login siden skal brugere have mulighed for både at logge ind eller oprette sig som
// bruger. Som udgangspunkt skal login vises, men trykker man på Opret bruger skal
// formen skifte til en tilmeldings form.
// Begge skal sendes til API´et på deres respektive endpoints og det skal være et
// fungerende log ind. Det vil sige at brugerens data og auth tokens gemmes i cookies, så
// brugeren stadig er logget ind når man genindlæser siden.
export default function Login() {
  return (
    <div className={style.loginStyle}>
      <h1>Hej</h1>
    </div>
  );
}
