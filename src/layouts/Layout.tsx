import { Outlet } from 'react-router';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import style from './layout.module.scss';
import CtaBanner from '../components/CtaBanner/CtaBanner';
import { useContext } from 'react';
import { AuthContext } from '../context/context/AuthContext';

export function Layout() {
  const {userData} = useContext(AuthContext);

  return (
    <div className={style.layoutContainer}>
      <Navbar />
      {!userData && <CtaBanner />}
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
