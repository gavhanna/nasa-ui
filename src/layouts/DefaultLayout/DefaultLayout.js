import React from "react";
import { Header } from "../../components";

const DefaultLayout = ({ sectionRoutes, children }) => {
  return (
    <div className="app default-layout">
      <Header sectionRoutes={sectionRoutes} />
      {children}
    </div>
  );
};

export default DefaultLayout;
