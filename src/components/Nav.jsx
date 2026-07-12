import { NavLink } from 'react-router-dom'
import styles from './Nav.module.css'

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <span className={styles.title}>24h Klimatet</span>
      <div className={styles.links}>
        <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''}>
          Schema
        </NavLink>
        <NavLink to="/aktiviteter" className={({ isActive }) => isActive ? styles.active : ''}>
          Detta händer på stan
        </NavLink>
      </div>
    </nav>
  )
}
