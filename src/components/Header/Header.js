import React from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import cx from "classnames";
import ThemeToggle from "../ThemeToggle";
import Subnav from "../Subnav/Subnav";

const Header = ({ sectionRoutes }) => {
  return (
    <header className={styles.header}>
      <nav className={cx(styles.nav, "container")}>
        <Link to="/" className="mr-auto">
          <i className={cx(styles.logo, "fa-solid fa-robot")}></i>
        </Link>
        <ul className={styles.navLinks}>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/apod" className="hasSectionRoutes">
              APOD
            </NavLink>
          </li>
        </ul>
        <ThemeToggle className="ml-3" />
      </nav>
      {sectionRoutes.length > 0 && <Subnav sectionRoutes={sectionRoutes} />}
    </header>
  );
};

export default Header;
