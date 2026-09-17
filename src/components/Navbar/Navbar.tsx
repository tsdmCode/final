import { useContext, useState } from 'react';
import style from './navbar.module.scss';
import { NavLink } from 'react-router';
import { GiHamburgerMenu } from "react-icons/gi";
import NavMenu from '../NavMenu/NavMenu';
import logo from '../../assets/logo/logo-white.png';
import { AuthContext } from '../../context/context/AuthContext';

export default function Navbar() {
  const {userData, logout} = useContext(AuthContext)
  const [navVis, setNavVis] = useState(false);

  return (
    <header className={style.navbarStyle}>
      <img src={logo} alt="" />
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
            <NavLink className={({isActive}) => (isActive ? style.active : '')} to={'/news/1'}>
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
              <li onClick={logout}>
                <a>Logout</a>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to={'/register?mode=register'}>Opret Bruger</NavLink>
              </li>
              {/* <hr /> */}
              <li>
                <NavLink to={'/register?mode=login'}>Login</NavLink>
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
