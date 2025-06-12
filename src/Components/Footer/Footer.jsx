import styles from './Footer.module.css'
import { NavLink } from 'react-router-dom'

export default function Footer() {
    return (
      // Footerens indhold med links til forskellige sider
      <div className={styles.Footer}>
        <div className={styles.left}>
        <NavLink to="/Contact" className={styles.link}>
          Contact us here
        </NavLink>
          <b>Copyright @Plug & Pick 2025</b>
        </div>
          <div className={styles.right}>
          <NavLink to="/Terms" className={styles.link}>
            Terms and conditions
          </NavLink>
          <NavLink to="/PrivacyPolicy" className={styles.link}>
            Privacy policy
          </NavLink>
          <NavLink to="/CookiePolicy" className={styles.link}>
            Cookies
          </NavLink>
          </div>
      </div>
    );
}