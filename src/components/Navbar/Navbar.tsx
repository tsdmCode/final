import { useState } from 'react';
import style from './navbar.module.scss';
import { NavLink } from 'react-router';
import { GiHamburgerMenu } from "react-icons/gi";
import NavMenu from '../NavMenu/NavMenu';
export default function Navbar() {
  const [userData] = useState(true); //placeholder så jeg kan teste min conditional logik
  const [navVis, setNavVis] = useState(false);
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
        <GiHamburgerMenu className={style.burger} onClick={() => setNavVis(true)} style={{ color: '#D9D9D9', cursor: 'pointer' }} size={24} />
        {navVis && <NavMenu setNavVis={setNavVis} />}
    </header>
  );
}
