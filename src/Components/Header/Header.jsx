import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'
import { RxHamburgerMenu } from 'react-icons/rx'
import { IoClose } from 'react-icons/io5'
import { FiShoppingCart } from "react-icons/fi";


export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false) // State der styrer menuens synlighed
    const handleLinkClick = () => setMenuOpen (false) // Til at lukke når et link klikkes

    return (
      <div className={styles.top}>
        <div className={styles.infoBox}>
          <p className={styles.infoText}>
            Use promo code <b>Summer10</b> for 10% off
          </p>
        </div>
        <header className={styles.header}>
          <div className={styles.logo}>Plug & Pick</div>

          {/* Navigation */}
          <nav className={styles.desktopNav}>
            <NavLink to="/" className={styles.link}>
              Home
            </NavLink>
            <NavLink to="/Products" className={styles.link}>
              The shop
            </NavLink>
            <NavLink to="/Contact" className={styles.link}>
              Contact
            </NavLink>
          </nav>

          {/* Links til favoritter og kurv */}
          <div className={styles.icons}>
            <NavLink to="/Favorites" className={styles.favIcon}>
              ♥
            </NavLink>
            <NavLink to="/Cart" className={styles.cartIcon}>
              <FiShoppingCart size={26} />
            </NavLink>

            {/* Ikon til burgermenu */}
            <div
              className={styles.burgerIcon}
              onClick={() => setMenuOpen(true)}
            >
              <RxHamburgerMenu size={28} />
            </div>
          </div>

          <div className={`${styles.overlay} ${menuOpen ? styles.show : ""}`}> {/* show tilføjes hvis menuen er åben */}
            <div
              className={styles.closeIcon}
              onClick={() => setMenuOpen(false)}
            >
              <IoClose size={28} />
            </div> {/* Luk ikon der sætter menuOpen til at være falsk */}

            {/* Mobil menu */}
            <nav className={styles.mobileNav}>
              <NavLink
                to="/"
                className={styles.mobileLink}
                onClick={handleLinkClick}
              >
                Home
              </NavLink>

              <NavLink
                to="/Products"
                className={styles.mobileLink}
                onClick={handleLinkClick}
              >
                The shop
              </NavLink>

              <NavLink
                to="/Contact"
                className={styles.mobileLink}
                onClick={handleLinkClick}
              >
                Contact
              </NavLink>
            </nav>
          </div>
        </header>
      </div>
    );
}