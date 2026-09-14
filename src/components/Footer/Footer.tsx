import { useState, type SyntheticEvent } from 'react';
import style from './footer.module.scss';

export default function Footer() {
  const [formEmail, setFormEmail] = useState<string>('');
  const [formError, setFormError] = useState<string | null>(null);

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    setFormError(null);

    //hat-tip https://regexr.com/3e48o
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    if (!emailRegex.test(formEmail)) {
      setFormError('Indtast venligst en gyldig mail.');
      return;
    }

    try {
      const res = await fetch(import.meta.env.VITE_URL + '/api/newsletters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formEmail }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Backend Server Error HTML:', errorText);
        setFormError('Der skete en fejl på serveren. Prøv igen senere.');
        return;
      }

      setFormEmail('');
      alert('Tilmeldt');
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <footer className={style.footerStyle}>
      <section>
        <h2>For jobsøgere</h2>
        <a href="#">Din kundeside</a>
        <a href="#">Opret profil</a>
        <a href="#">Gemte jobs</a>
      </section>
      <section>
        <h2>For arbejdsgivere</h2>
        <a href="#">Virsomhedsprofil</a>
        <a href="#">Opret annonce</a>
        <a href="#">Jobannoncering</a>
        <a href="#">Rekruttering</a>
      </section>
      <section>
        <h2>Links</h2>
        <a href="#">Om Gratissimo</a>
        <a href="#">Job hos os</a>
        <a href="#">For investorer</a>
        <a href="#">Presse</a>
      </section>
      <section>
        <h2>Vil du have jobs direkte i din indbakke?</h2>
        <p>Tilmeld dig vores elektroniske nyhedsbrev</p>
        <form onSubmit={handleSubmit}>
          <input type="email" onChange={(e) => setFormEmail(e.target.value)} value={formEmail} />
          <input type="submit" value={'Tilmeld'} />
        </form>
        {formError && <p>{formError}</p>}
      </section>
      <section>
        <p>Fidusvej 23</p>
        <p>9230 Øster Lundby</p>
        <a href="tel:+4522132213">+45 22 13 22 13</a>
        <div className={style.soMe}>
          <img src="src/assets/icons/SoMe/LinkedIn Circled.png" alt="" />
          <img src="src/assets/icons/SoMe/Facebook.png" alt="" />
          <img src="src/assets/icons/SoMe/Instagram Circle.png" alt="" />
          <img src="src/assets/icons/SoMe/Google Plus.png" alt="" />
        </div>
      </section>
    </footer>
  );
}
