import React, { useState } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./Header.module.scss";
import cx from "classnames";

const Header = ({ sectionRoutes }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedMainRoute, setSelectedMainRoute] = useState(
    `/${location.pathname.split("/")[1]}`
  );

  const onMainRouteSelect = (e) => {
    navigate(e.target.value);
    setSelectedMainRoute(e.target.value);
  };

  return (
    <nav className={styles.nav}>
      <Link to="/" className="mr-auto">
        <img src="/assets/NASA_logo.svg" alt="" />
      </Link>
      {sectionRoutes.length > 0 && (
        <div className={cx(styles.subRoutes, styles.links)}>
          {sectionRoutes.map((route, idx) => (
            <NavLink className={styles.navLink} key={idx} to={route.path}>
              {route.name}
            </NavLink>
          ))}
        </div>
      )}
      <select
        name="mainRoutes"
        id="mainRoutes"
        className={styles.mainRoutes}
        onChange={onMainRouteSelect}
        value={selectedMainRoute}
      >
        <option value="/">Home</option>
        <option value="/apod">APOD</option>
      </select>
    </nav>
  );
};

export default Header;
