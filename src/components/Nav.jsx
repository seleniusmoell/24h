import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Nav.module.css'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <nav className={styles.nav}>
      <span className={styles.title}>24 timmar för Klimatet - liveprogram</span>

      <button className={styles.burger} onClick={() => setOpen(o => !o)} aria-label="Meny">
        {open ? '✕' : '≡'}
      </button>

      <div className={`${styles.links} ${open ? styles.linksOpen : ''}`}>
        <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''} onClick={close}>
          Scenprogram
        </NavLink>
        <NavLink to="/aktiviteter" className={({ isActive }) => isActive ? styles.active : ''} onClick={close}>
          Detta händer på stan
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
