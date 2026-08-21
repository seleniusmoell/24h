import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import styles from './Nav.module.css'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  const { pathname } = useLocation()
  const isTorg = pathname === '/pa-torget'

  return (
    <nav className={`${styles.nav} ${isTorg ? styles.torgNav : ''}`}>
      <NavLink to="/" className={styles.title}>24 timmar för Klimatet - liveprogram</NavLink>

      <button className={styles.burger} onClick={() => setOpen(o => !o)} aria-label="Meny">
        {open ? '✕' : '≡'}
      </button>

      <div className={`${styles.links} ${open ? styles.linksOpen : ''}`}>
        <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''} onClick={close}>
          Scenprogram
        </NavLink>
        <NavLink to="/pa-torget" className={({ isActive }) => isActive ? styles.active : ''} onClick={close}>
          På Sergels torg
        </NavLink>
        <NavLink to="/pa-stan" className={({ isActive }) => isActive ? styles.active : ''} onClick={close}>
          På stan
        </NavLink>
        <NavLink to="/aktiviteter" className={({ isActive }) => isActive ? styles.active : ''} onClick={close}>
          I Vasaparken
        </NavLink>
        <NavLink to="/medverkande" className={({ isActive }) => isActive ? styles.active : ''} onClick={close}>
          Medverkande
        </NavLink>
        <NavLink to="/stod-oss" className={({ isActive }) => isActive ? styles.active : ''} onClick={close}>
          Stöd oss
        </NavLink>
      </div>
    </nav>
  )
}
