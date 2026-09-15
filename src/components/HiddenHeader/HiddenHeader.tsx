import style from './hiddenheader.module.scss';

export default function HiddenHeader({ topic }: {topic: string}) {
  return (
    <h1 className={style.hiddenheaderStyle}>
      {' '}
      <h1 className="sr-only">{topic}</h1>
    </h1>
  );
}
