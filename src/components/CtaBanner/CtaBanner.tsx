import { useNavigate } from 'react-router';
import style from './ctabanner.module.scss';

export default function CtaBanner() {
  const navigate = useNavigate();

  const path = window.location.pathname;

  if (path.startsWith('/register') || path.startsWith('/minside')) {
    return null;
  }

  return (
    <div onClick={() => navigate('/register?mode=register')} className={style.ctabannerStyle}>
      <p>Vi hjælper dig på vej til dit næste frivillige job</p>
      <button>Log ind eller opret dig</button>
    </div>
  );
}
