import React from "react";
import { Header } from "../../components";

const DefaultLayout = ({ sectionRoutes, children }) => {
  console.log({ sectionRoutes });
  return (
    <div className="app default-layout">
      <Header sectionRoutes={sectionRoutes} />
      <div className="pageContent container">{children}</div>
    </div>
  );
};

export default DefaultLayout;
