import React from "react";
import { DefaultLayout } from "../../layouts";
import { Outlet } from "react-router-dom";
import routes from "./routes";

const APOD = () => {
  return (
    <DefaultLayout sectionRoutes={routes}>
      <h1 className="pageTitle">Photo of the Day</h1>
      <Outlet />
    </DefaultLayout>
  );
};

export default APOD;
export { default as APODArchive } from "./APOD.archive";
export { default as APODPhotoOfTheDay } from "./APOD.photoOfTheDay";
