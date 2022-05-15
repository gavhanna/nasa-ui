import React from "react";
import PropTypes from "prop-types";
import { Header } from "../../components";

const DefaultLayout = ({ sectionRoutes, children }) => {
  return (
    <div className="app default-layout">
      <Header sectionRoutes={sectionRoutes} />
      <div className="pageContent container">{children}</div>
    </div>
  );
};

DefaultLayout.propTypes = {
  sectionRoutes: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      name: PropTypes.string,
      icon: PropTypes.element,
    })
  ).isRequired,
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
