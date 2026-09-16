import style from './register.module.scss';
import { useState, useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { AuthContext } from '../../context/context/AuthContext';

export default function Register() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'login';
  const { userData, setUserData } = useContext(AuthContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [messageError, setMessageError] = useState<string | null>('');
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) navigate('/home');
  }, [userData, navigate]);

  async function handleRegister() {
    setMessageError(null);
    const nameRegex = /^[A-za-z]+$/;
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const phoneRegex = /^(\+45)*[0-9]{8}$/;

    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
      setMessageError('Mærkeligt navn, ingen specielle karakterer tak!');
      return;
    }

    if (!phoneRegex.test(phone)) {
      setMessageError('Ugyldigt tlf nummer');
      return;
    }

    if (!emailRegex.test(email)) {
      setMessageError('Ugyldig email');
      return;
    }

    if (password !== repeatPassword) {
      setMessageError('Password matcher ikke');
      return;
    }

    await fetch('http://localhost:4000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname: firstName,
        lastname: lastName,
        email,
        password,
        phone,
        address,
        city,
        zipcode,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        navigate('/login');
        // return res.text();
      })
      .catch((error) => {
        console.error('Error creating user: ', error);
        setMessageError(error);
        return;
      });
  }

  async function handleLogin(e: React.SubmitEvent) {
    e.preventDefault();

    await fetch('http://localhost:4000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: email, password }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.text();
      })
      .then((text) => {
        const data = JSON.parse(text);
        setUserData(data);
      })
      .catch((error) => {
        console.error('Error logging in: ', error);
      });
  }

  return (
    <div className={style.registerStyle}>
      <article>
        <h2>Log ind eller opret dig som bruger</h2>
        <p>
          Når du opretter en profil på Gratissimo får du adgang til at oprette, slette og redigere i job annoncer. Som
          privatperson får du mulighed for at gemme de jobs du kunne være interesseret i.{' '}
        </p>
      </article>
      <h2>{mode === 'register' ? 'Opret ny Profil' : 'Log ind'}</h2>
      <>
        {mode === 'register' ? (
          <form action={handleRegister}>
            <span>
              <label htmlFor="email">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" />
            </span>
            <span>
              <label htmlFor="password">Password:</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" />
            </span>
            <span>
              <label htmlFor="gentag password">Gentag password</label>
              <input
                type="password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                name="gentag password"
              />
            </span>
            <span>
              <label htmlFor="fornavn">Fornavn</label>
              <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} name="fornavn" />
            </span>
            <span>
              <label htmlFor="efternavn">Efternavn</label>
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} name="efternavn" />
            </span>
            <span>
              <label htmlFor="addresse">Addresse</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} name="addresse" />
            </span>
            <span>
              <label htmlFor="telefon">Telefon</label>
              <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} name="telefon" />
            </span>
            <span>
              <label htmlFor="postnummer">Postnummer</label>
              <input type="number" value={zipcode} onChange={(e) => setZipcode(e.target.value)} name="telefon" />
            </span>
            <span>
              <label htmlFor="by">By</label>
              <input type="text" value={city} onChange={(e) => setCity(e.target.value)} name="by" />
            </span>

            <input type="submit" value={'REGISTRÉR'} />
          </form>
        ) : (
          <form onSubmit={(e) => handleLogin(e)}>
            <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input
              placeholder="Password"
              type="password"
              value={password}
              name=""
              id=""
              onChange={(e) => setPassword(e.target.value)}
            />
            <input type="submit" value="Log ind" />
          </form>
        )}
        {messageError && <p>{messageError}</p>}
      </>
      {mode === 'register' ? (
        <a onClick={() => navigate('/register?mode=login')}>Log ind</a>
      ) : (
        <a onClick={() => navigate('/register?mode=register')}>Ny bruger? Opret dig her</a>
      )}
    </div>
  );
}
