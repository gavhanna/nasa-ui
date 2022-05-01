import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Subnav.module.scss";
import cx from "classnames";

const Subnav = ({ sectionRoutes }) => {
  return (
    <div className={cx(styles.subnav)}>
      <ul className="container">
        {sectionRoutes.map((route) => (
          <NavLink to={route.path} key={route.path}>
            {route.name}
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default Subnav;
