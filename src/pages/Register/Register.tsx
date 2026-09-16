import style from './register.module.scss';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../context/context/AuthContext';

export default function Register() {
  const { userData } = useContext(AuthContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
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

    if (!nameRegex.test(firstName)) {
      setMessageError('Mærkeligt navn, ingen specielle karakterer tak!');
      return;
    }

    if (!nameRegex.test(lastName)) {
      setMessageError('Mærkeligt navn, ingen specielle karakterer tak!');
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
      body: JSON.stringify({ firstname: firstName, lastname: lastName, email, password, phone, address }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.text();
      })
      .catch((error) => {
        console.error('Error creating user: ', error);
      });
  }

  return (
    <div className={style.registerStyle}>
      <h2>Register</h2>
      <>
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
              value={password}
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

          <input type="submit" value={'REGISTRÉR'} />
        </form>
        {messageError && <p>{messageError}</p>}
      </>
      <a href='/login'>Log ind</a>
    </div>
  );
}
