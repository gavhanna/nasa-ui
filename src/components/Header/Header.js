import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./Header.module.scss";
import cx from "classnames";
import ThemeToggle from "../ThemeToggle";

const Header = ({ sectionRoutes }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedMainRoute, setSelectedMainRoute] = useState(
    `/${location.pathname.split("/")[1]}`
  );
  const [selectedSubRoute, setSelectedSubRoute] = useState("");

  const onMainRouteSelect = (e) => {
    navigate(e.target.value);
    setSelectedMainRoute(e.target.value);
  };

  const onSubRouteSelect = (e) => {
    navigate(e.target.value);
    setSelectedSubRoute(e.target.value);
  };

  return (
    <nav className={styles.nav}>
      <Link to="/" className="mr-auto">
        <i className={cx(styles.logo, "fa-solid fa-robot")}></i>
      </Link>
      {sectionRoutes.length > 0 && (
        <div className={styles.subRoutes}>
          <select
            name="subRoutes"
            id="subRoutes"
            className={styles.navSelect}
            onChange={onSubRouteSelect}
            value={selectedSubRoute}
          >
            {sectionRoutes.map((route, idx) => (
              <option key={idx} value={route.path}>
                {route.name}
              </option>
            ))}
          </select>
        </div>
      )}
      <select
        name="mainRoutes"
        id="mainRoutes"
        className={styles.navSelect}
        onChange={onMainRouteSelect}
        value={selectedMainRoute}
      >
        <option value="/">Home</option>
        <option value="/apod">APOD</option>
      </select>
      <ThemeToggle className="ml-3" />
    </nav>
  );
};

export default Header;
