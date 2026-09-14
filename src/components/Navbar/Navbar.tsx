import { useState } from 'react';
import style from './navbar.module.scss';
import { NavLink } from 'react-router';

export default function Navbar() {
  const [userData] = useState(true); //placeholder så jeg kan teste min conditional logik
  function logOut() {
    //blabla placeholder
  }
  return (
    <header className={style.navbarStyle}>
      <img src="src/assets/logo/logo-white.png" alt="" />
      <nav>
        <ul>
          <li>
            <NavLink className={({isActive}) => (isActive ? style.active : '')} to={'/searchresults'}>
              Alle jobs
            </NavLink>
          </li>
          <li>
            <NavLink className={({isActive}) => (isActive ? style.active : '')} to={'/opretannonce'}>
              Opret Annonce
            </NavLink>
          </li>
          <li>
            <NavLink className={({isActive}) => (isActive ? style.active : '')} to={'/news'}>
              Nyheder
            </NavLink>
          </li>
        </ul>
        <ul className={style.loginList}>
          {userData ? (
            <>
              <li>
                <NavLink to={'/minside'}>Min side</NavLink>
              </li>
              {/* <hr /> */}
              <li onClick={logOut}>
                <a>Logout</a>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to={'/register'}>Opret Bruger</NavLink>
              </li>
              {/* <hr /> */}
              <li>
                <NavLink to={'/login'}>Login</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
