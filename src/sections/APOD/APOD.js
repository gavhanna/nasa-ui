import React from "react";
import { DefaultLayout } from "../../layouts";
import { Outlet } from "react-router-dom";
import routes from "./APOD.routes";

const APOD = () => {
  return (
    <DefaultLayout sectionRoutes={routes}>
      <h1 className="pageTitle">Photo of the Day</h1>
      <Outlet />
    </DefaultLayout>
  );
};

export default APOD;
export { default as APODArchive } from "./APODArchive/APODArchive";
export { default as APODPhotoOfTheDay } from "./APODPhotoOfTheDay/APODPhotoOfTheDay";
